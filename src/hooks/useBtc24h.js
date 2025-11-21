import { useEffect, useRef, useState } from 'react';
import { WS_URL, INFO_URL } from '../lib/hlEndpoints';
import { calculatePriceChange } from '../lib/priceCalculations';
import { getCachedPrice, setCachedPrice } from '../lib/database/priceCache';

const COIN = 'BTC';

/**
 * Hook personnalisé pour récupérer le prix BTC en temps réel avec cache fallback
 * 
 * Stratégie :
 * 1. Charge immédiatement le cache (affichage instantané)
 * 2. Fetch l'API meta pour prevDayPx
 * 3. Souscrit au WebSocket pour prix live
 * 4. Met à jour le cache quand les données sont fraîches
 * 5. Si Hyperliquid fail, utilise le cache
 */
export default function useBtc24h() {
  const [price, setPrice] = useState(null);          // Prix actuel (midPx)
  const [prevDayPx, setPrevDayPx] = useState(null);  // Prix il y a 24h
  const [status, setStatus] = useState('loading');   // loading | live | error | cached
  const [source, setSource] = useState(null);        // 'hyperliquid' | 'cache'
  const [error, setError] = useState(null);
  const wsRef = useRef(null);
  const fetchedMetaRef = useRef(false);

  // 1. Charger le cache immédiatement au montage
  useEffect(() => {
    async function loadCache() {
      try {
        const cached = await getCachedPrice(COIN);
        
        if (cached) {
          console.log(`📦 Cache BTC chargé (${cached.cacheAge}s ago)`);
          setPrice(cached.price);
          setPrevDayPx(cached.prevDayPx);
          setStatus('cached');
          setSource('cache');
        }
      } catch (err) {
        console.warn('Erreur chargement cache:', err);
      }
    }
    
    loadCache();
  }, []);

  // 2. Fetch prevDayPx depuis l'API meta
  useEffect(() => {
    async function fetchMeta() {
      if (fetchedMetaRef.current) return; // Éviter double fetch
      fetchedMetaRef.current = true;

      try {
        const res = await fetch(INFO_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'meta' })
        });
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        
        const data = await res.json();
        const metaArray = data[1];
        const universeArray = data[0].universe;
        
        const btcIndex = universeArray.findIndex(coin => coin.name === COIN);
        
        if (btcIndex !== -1 && metaArray[btcIndex]) {
          const btcMeta = metaArray[btcIndex];
          
          if (btcMeta.prevDayPx) {
            setPrevDayPx(Number(btcMeta.prevDayPx));
            console.log('✅ prevDayPx récupéré depuis Hyperliquid:', btcMeta.prevDayPx);
          }
        }
      } catch (err) {
        console.error('❌ Erreur fetch meta:', err.message);
        // Ne pas bloquer l'UI, le cache peut prendre le relais
      }
    }

    fetchMeta();
  }, []);

  // 3. WebSocket pour prix live
  useEffect(() => {
    let closing = false;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('🔌 WebSocket BTC connecté');
      setStatus('live');
      setSource('hyperliquid');
      
      ws.send(JSON.stringify({
        method: 'subscribe',
        subscription: { type: 'allMids' }
      }));
    };

    ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data);

        if (msg?.channel === 'allMids' && msg?.data?.mids) {
          const mids = msg.data.mids;
          const currentPrice = mids[COIN] ?? mids['U' + COIN];
          
          if (currentPrice != null) {
            setPrice(Number(currentPrice));
            setStatus('live');
            setSource('hyperliquid');
          }
        }
      } catch (err) {
        console.warn('WS parse error:', err);
      }
    };

    ws.onerror = (e) => {
      if (closing) return;
      console.error('WS error:', e);
      setStatus('error');
      setError('WS_ERROR');
    };

    ws.onclose = (ev) => {
      if (closing) return;
      if (ev.code === 1000) return;
      console.warn('WS closed:', ev.code, ev.reason);
      setStatus('cached');
      setError(`WS_CLOSE_${ev.code || 0}`);
    };

    return () => {
      closing = true;
      try { ws.close(1000, 'app_cleanup'); } catch {}
    };
  }, []);

  // 4. Mettre à jour le cache quand les données sont fraîches
  useEffect(() => {
    if (price != null && prevDayPx != null && source === 'hyperliquid') {
      const priceChange = calculatePriceChange(price, prevDayPx);
      
      if (priceChange) {
        // Mise à jour asynchrone du cache (ne bloque pas l'UI)
        setCachedPrice(COIN, {
          price,
          prevDayPx,
          deltaAbs: priceChange.deltaAbs,
          deltaPct: priceChange.deltaPct
        }).catch(err => console.warn('Erreur update cache:', err));
      }
    }
  }, [price, prevDayPx, source]);

  // Calcul de la variation avec la logique métier
  const priceChange = calculatePriceChange(price, prevDayPx);

  return {
    price,
    prevDayPx,
    deltaAbs: priceChange?.deltaAbs,
    deltaPct: priceChange?.deltaPct,
    status,   // 'loading' | 'live' | 'cached' | 'error'
    source,   // 'hyperliquid' | 'cache'
    error
  };
}
