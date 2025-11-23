// Hook pour accéder aux données d'un token depuis Binance
// Lit directement depuis priceTokenBinance dans Firebase
import { useState, useEffect } from 'react'
import { getCachedPriceBinance } from '../lib/database/priceCache'
import { getTokenConfig } from '../config/tokenList'

export function useBinanceToken(symbol) {
  const [data, setData] = useState(null)
  const config = getTokenConfig(symbol)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      const cached = await getCachedPriceBinance(symbol)
      if (isMounted && cached) {
        setData({
          price: cached.price,
          prevDayPx: cached.prevDayPx,
          deltaAbs: cached.deltaAbs,
          deltaPct: cached.deltaPct,
          status: 'live',
          source: 'binance',
          updatedAt: cached.timestamp
        })
      }
    }

    // Fetch initial
    fetchData()

    // Refresh toutes les 2 secondes pour synchroniser avec useBnbPrice
    const interval = setInterval(fetchData, 2000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [symbol])

  return {
    // Données live
    price: data?.price ?? null,
    prevDayPx: data?.prevDayPx ?? null,
    deltaAbs: data?.deltaAbs ?? null,
    deltaPct: data?.deltaPct ?? null,
    status: data?.status ?? 'loading',
    source: 'binance',
    updatedAt: data?.updatedAt ?? null,
    
    // Config statique
    name: config?.name ?? symbol,
    color: config?.color ?? '#666',
    decimals: config?.decimals ?? 2,
    
    // Helper
    isLive: data?.status === 'live',
    hasError: false,
    error: null
  }
}
