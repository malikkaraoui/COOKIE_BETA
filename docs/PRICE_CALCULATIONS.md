# Logique métier : Calculs de variations de prix

## 📊 Vue d'ensemble

Le fichier `src/lib/priceCalculations.js` contient toute la **logique métier réutilisable** pour calculer et formater les variations de prix des cryptomonnaies.

Cette logique est utilisée par tous les tokens (BTC, ETH, etc.) pour garantir des calculs cohérents dans toute l'application.

---

## 🎯 Pourquoi un fichier séparé ?

### ✅ **Avantages** :
1. **Réutilisabilité** : Un seul endroit pour tous les calculs de variation
2. **Testabilité** : Facile à tester unitairement (pure functions)
3. **Cohérence** : Tous les tokens utilisent les mêmes formules
4. **Maintenance** : Modifier une formule = un seul fichier à changer
5. **Performance** : Pas de duplication de code

### 🔄 **Utilisé par** :
- `useBtc24h.js` → Variation BTC sur 24h
- (Futur) `useEth24h.js` → Variation ETH
- (Futur) `useToken24h.js` → Hook générique pour n'importe quel token

---

## 📐 Fonctions disponibles

### 1️⃣ `calculatePriceChange(currentPrice, referencePrice)`

**Calcule la variation absolue et en pourcentage entre deux prix.**

```javascript
const result = calculatePriceChange(95000, 92000)
// → { deltaAbs: 3000, deltaPct: 3.26 }
```

**Cas d'usage** :
- Variation sur 24h (current vs prevDayPx)
- Variation depuis l'achat (current vs entryPrice)
- Variation depuis ATH (current vs allTimeHigh)

**Formules** :
```javascript
deltaAbs = currentPrice - referencePrice
deltaPct = ((currentPrice / referencePrice - 1) * 100)
```

---

### 2️⃣ `formatPriceChange(deltaPct)`

**Formate un pourcentage de variation avec signe et couleur.**

```javascript
formatPriceChange(3.26)
// → { text: '+3.26%', color: 'green', sign: '+' }

formatPriceChange(-2.15)
// → { text: '-2.15%', color: 'red', sign: '-' }

formatPriceChange(null)
// → { text: '--', color: 'gray', sign: '' }
```

**Couleurs retournées** :
- `green` → Variation positive (hausse)
- `red` → Variation négative (baisse)
- `gray` → Pas de données

---

### 3️⃣ `formatPrice(price, decimals = 2)`

**Formate un prix en USD avec séparateurs de milliers.**

```javascript
formatPrice(95847.50)
// → '$95,847.50'

formatPrice(0.000123, 6)
// → '$0.000123'

formatPrice(null)
// → '--'
```

**Utilise `Intl.NumberFormat`** pour respecter les standards internationaux.

---

## 🚀 Optimisations Hyperliquid

### ⚡ **Avant** (lent) :
```javascript
// ❌ Calcul manuel via candles WebSocket
// → 2 souscriptions WS
// → Parsing de candles 1d
// → Calcul manuel de deltaAbs/deltaPct
```

### ✅ **Maintenant** (rapide) :
```javascript
// ✅ Utilise prevDayPx directement depuis l'API meta
// → 1 seul fetch HTTP initial
// → Réutilise la logique métier centralisée
// → Rafraîchissement toutes les 5 minutes (suffisant)
```

### 📡 **Source de données** :
Hyperliquid fournit **directement `prevDayPx`** dans l'endpoint `meta` :

```json
POST https://api.hyperliquid-testnet.xyz/info
{ "type": "meta" }

// Réponse :
[
  { "universe": [...] },
  [
    {
      "markPx": "95847.50",      // Prix actuel
      "prevDayPx": "92432.10"    // Prix il y a 24h ✅
    }
  ]
]
```

**Pas besoin de candles** → Plus simple, plus rapide !

---

## 🧪 Tests recommandés

```javascript
// Test 1 : Variation positive
expect(calculatePriceChange(100, 90)).toEqual({
  deltaAbs: 10,
  deltaPct: 11.11
})

// Test 2 : Variation négative
expect(calculatePriceChange(90, 100)).toEqual({
  deltaAbs: -10,
  deltaPct: -10
})

// Test 3 : Prix nul
expect(calculatePriceChange(null, 100)).toBeNull()

// Test 4 : Division par zéro
expect(calculatePriceChange(100, 0)).toBeNull()
```

---

## 📚 Références

- [Hyperliquid API Docs](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api)
- [Meta endpoint](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals)
- Code source : `src/lib/priceCalculations.js`
