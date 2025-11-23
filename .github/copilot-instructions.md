# 🍪 COOKIE - Instructions Copilot

## Vue d'ensemble

Application React de trading crypto avec **architecture dual-source** :
- **Hyperliquid API** : 10 tokens (BTC, ETH, SOL, BNB, MATIC, kPEPE, AVAX, ATOM, APT, ARB)
- **Binance Spot API** : BNB + tokens BEP-20 (extensible)
- **Firebase Realtime Database** : Cache prix + auth utilisateurs
- **Drag & Drop** : Sélection tokens personnalisée

---

## 🎯 Règles d'Architecture STRICTES

### App.jsx = MINIMAL (< 50 lignes)
```jsx
// ✅ BON : Uniquement composition + init
export default function App() {
  useEffect(() => {
    initializePriceNodes()
    cleanupOldPriceCache()
  }, [])
  
  return (
    <MarketDataProvider>
      <SelectedTokensProvider>
        <AppLayout />
      </SelectedTokensProvider>
    </MarketDataProvider>
  )
}

// ❌ MAUVAIS : Logique métier dans App.jsx
```

### Séparation des Responsabilités

| Type de Logique | Emplacement | Exemple |
|----------------|-------------|---------|
| UI réutilisable | `src/hooks/` | `useDraggable.js`, `useResizablePanel.js` |
| Métier / API | `src/lib/` | `priceCalculations.js`, `binanceClient.js` |
| Configuration | `src/config/` | `tokenList.js`, `binanceConfig.js` |
| Composants UI | `src/elements/` | `TokenTile.jsx` |
| Layouts globaux | `src/components/` | `Topbar.jsx`, `Sidebar.jsx` |
| Pages routing | `src/pages/` | `page1.jsx`, `page2.jsx`, `page4.jsx` |

### Convention Routing (URLs)
- **PascalCase obligatoire** : `/MarmitonCommunautaire`, `/MaCuisine`, `/BinanceToken`
- **Descriptif et explicite** : Pas de `/page1`, `/page2` (générique)
- **Synchronisé avec labels Sidebar** : URL = même wording que menu
- **Documentation** : Voir `docs/ROUTING.md` pour détails complets

---

## 🔥 Firebase - ARCHITECTURE DUAL-SOURCE

### Structure Base de Données
```
/priceTokenHyper/{coin}/     ← Hyperliquid (BTC, ETH, SOL, BNB*, etc.)
/priceTokenBinance/{coin}/   ← Binance (BNB uniquement pour l'instant)
/users/{uid}/selectedTokens  ← Tokens sélectionnés par utilisateur
```

**BNB = SEUL token dans les DEUX sources**

### Import Paths depuis lib/database/
```javascript
// ❌ ERREUR
import { db } from '../config/firebase'

// ✅ CORRECT
import { db } from '../../config/firebase'
```

### Services Firebase
```javascript
// Hyperliquid → priceTokenHyper
setCachedPriceHyper(coin, { price, prevDayPx, deltaAbs, deltaPct })

// Binance → priceTokenBinance  
setCachedPriceBinance(coin, { price, prevDayPx, deltaAbs, deltaPct })
```

---

## ⚠️ ANTI-PATTERNS CRITIQUES

### NOWNodes/BSC = ON-CHAIN ONLY
```
❌ NE JAMAIS utiliser NOWNodes pour prix de marché
✅ NOWNodes = balances on-chain, smart contracts, transactions
✅ Prix de marché = Binance Spot API ou Hyperliquid API

Historique : Tentative NOWNodes pour prix → supprimée complètement
```

### Pas de Clés API Côté Client
```javascript
// ❌ INTERDIT
const BINANCE_KEY = 'abc123'

// ✅ CORRECT (.env.local)
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY
}
```

---

## 🧩 Patterns de Code

### Hooks pour Logique Réutilisable
```jsx
// ✅ Logique dans hook
export function useToken(symbol) {
  const { getToken } = useMarketData()
  return getToken(symbol)
}

// ✅ Composant utilise le hook
function TokenTile({ symbol }) {
  const { price, deltaPct } = useToken(symbol)
  return <div>{price} ({deltaPct}%)</div>
}
```

### Calculs dans lib/, Pas Composants
```javascript
// ✅ lib/priceCalculations.js
export function calculatePriceChange(current, previous) {
  const deltaAbs = current - previous
  const deltaPct = (deltaAbs / previous) * 100
  return { deltaAbs, deltaPct }
}
```

---

## 📚 MCP Servers

### Disponibles
- **Figma** : Charte graphique, extraction composants
- **Stripe** : Paiements (future feature)
- **GitBook** : Docs Hyperliquid (https://hyperliquid.gitbook.io/hyperliquid-docs/~gitbook/mcp)

### Workflow
1. Vérifier serveur MCP démarré
2. Consulter docs via MCP
3. Adapter code à l'architecture du projet

---

## ✅ Checklist Code

- [ ] App.jsx minimal (< 50 lignes)
- [ ] Logique UI → hooks/
- [ ] Logique métier → lib/
- [ ] Import paths corrects (`../../config/firebase` depuis lib/)
- [ ] `setCachedPriceHyper` pour Hyperliquid
- [ ] `setCachedPriceBinance` pour Binance
- [ ] NOWNodes JAMAIS pour prix
- [ ] Pas clés API en dur
- [ ] Variables d'environnement (.env.local)

---

## 🐛 Erreurs Fréquentes

### Import Path Error
```
❌ Cannot find '../config/firebase' from lib/database/
✅ Utiliser '../../config/firebase'
```

### Firebase Permission Denied
```
✅ Vérifier database.rules.json
✅ Déployer via Firebase Console
✅ Initialiser nœuds (initializePriceNodes)
```

### Token Price = null
```
✅ Vérifier symbole dans getHyperliquidTokenSymbols()
✅ Vérifier source: 'hyperliquid' dans tokenList.js
✅ Ne JAMAIS envoyer tokens BSC à Hyperliquid API
```

---

**Avant de coder, confirmer compréhension :**
1. Architecture dual-source (Hyperliquid + Binance)
2. Anti-patterns (NOWNodes pour prix, clés API client)
3. Patterns (hooks UI, lib métier, import paths)
