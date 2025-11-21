# Architecture du Cache des Prix

## 🎯 Objectif

Garantir l'**affichage instantané** et la **résilience** des prix même si Hyperliquid est indisponible.

---

## 📊 Stratégie Hybride : Cache + Live

### 🔄 **Flux de données** :

```
┌─────────────────────────────────────────────────────────┐
│                    1. CHARGEMENT INITIAL                │
│                                                           │
│  ┌──────────────┐                                        │
│  │ useBtc24h()  │──► Lit Realtime Database               │
│  └──────────────┘    (priceCache/BTC)                    │
│         │                                                 │
│         ▼                                                 │
│   📦 Affichage IMMÉDIAT du cache                         │
│   (même si vieux de quelques secondes)                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  2. MISE À JOUR LIVE                    │
│                                                           │
│  ┌──────────────┐                                        │
│  │ useBtc24h()  │──► Fetch API meta (prevDayPx)          │
│  └──────────────┘                                        │
│         │                                                 │
│         ▼                                                 │
│  ┌──────────────┐                                        │
│  │ useBtc24h()  │──► WebSocket allMids (prix live)       │
│  └──────────────┘                                        │
│         │                                                 │
│         ▼                                                 │
│   🟢 Affichage LIVE + Mise à jour du cache               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  3. FALLBACK (si erreur)                │
│                                                           │
│  ❌ Hyperliquid timeout / erreur                         │
│         │                                                 │
│         ▼                                                 │
│  📦 Utilise le cache (< 1h)                              │
│     Status: "cached"                                     │
│     Indicateur: 📦 Cache                                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ Structure du Cache dans Realtime Database

### **Path** : `/priceCache/{coin}`

**Exemple pour BTC** :
```json
{
  "priceCache": {
    "BTC": {
      "price": 95847.50,
      "prevDayPx": 92432.10,
      "deltaAbs": 3415.40,
      "deltaPct": 3.69,
      "timestamp": 1732176000000,
      "source": "hyperliquid"
    },
    "ETH": {
      "price": 3245.12,
      "prevDayPx": 3180.00,
      "deltaAbs": 65.12,
      "deltaPct": 2.05,
      "timestamp": 1732176050000,
      "source": "hyperliquid"
    }
  }
}
```

### **Champs** :

| Champ | Type | Description |
|-------|------|-------------|
| `price` | number | Prix actuel du coin |
| `prevDayPx` | number | Prix il y a 24h (référence) |
| `deltaAbs` | number | Variation absolue en $ |
| `deltaPct` | number | Variation en % |
| `timestamp` | number | Timestamp de la dernière mise à jour |
| `source` | string | `"hyperliquid"` (toujours lors de l'écriture) |

---

## ⚙️ Règles de Sécurité

**Fichier** : `database.rules.json`

```json
{
  "priceCache": {
    "$coin": {
      ".read": true,           // ✅ Lecture publique (pas de données sensibles)
      ".write": "auth != null" // ✅ Écriture si connecté (évite spam)
    }
  }
}
```

### **Pourquoi lecture publique ?**
- Les prix sont des **données publiques** (pas de confidentialité)
- Permet l'affichage **même sans être connecté**
- Simplifie l'architecture

### **Pourquoi écriture authentifiée ?**
- Évite le **spam** ou les écritures abusives
- Seuls les utilisateurs connectés peuvent mettre à jour le cache
- Protection basique contre les bots

---

## 🧪 Logique de Validation du Cache

### **Âge maximum** : 1 heure

```javascript
const MAX_CACHE_AGE = 60 * 60 * 1000; // 1 heure en ms

if (cacheAge > MAX_CACHE_AGE) {
  console.warn('Cache trop ancien, ignoré');
  return null;
}
```

### **Pourquoi 1 heure ?**
- Les prix crypto changent rapidement
- Au-delà de 1h, le cache est **potentiellement obsolète**
- Force une nouvelle tentative vers Hyperliquid

### **Si cache > 1h ET Hyperliquid fail** :
- Erreur affichée : "Données indisponibles"
- Pas de prix affiché (mieux que d'afficher un prix périmé)

---

## 🚀 Optimisations

### 1️⃣ **Chargement instantané** (< 50ms)
```javascript
// Au montage, charge immédiatement le cache
useEffect(() => {
  getCachedPrice('BTC').then(setPrice);
}, []);
```

### 2️⃣ **Mise à jour asynchrone**
```javascript
// Ne bloque pas l'UI
setCachedPrice('BTC', data).catch(console.warn);
```

### 3️⃣ **Pas de polling inutile**
- WebSocket pour le prix live (push)
- Cache mis à jour uniquement quand les données changent
- Pas de `setInterval` pour écrire dans la DB

---

## 📈 Avantages de cette Architecture

| Avantage | Description |
|----------|-------------|
| **⚡ Rapidité** | Affichage instantané au chargement (cache) |
| **🛡️ Résilience** | Continue de fonctionner si Hyperliquid fail |
| **📊 Fraîcheur** | Données live quand disponibles |
| **💰 Économie** | Moins de requêtes API (cache local) |
| **🎯 Scalabilité** | Facilement extensible à tous les coins |

---

## 🔧 Fichiers Impliqués

| Fichier | Rôle |
|---------|------|
| `src/lib/database/priceCache.js` | Service de cache (get/set) |
| `src/hooks/useBtc24h.js` | Hook avec stratégie cache + live |
| `src/components/BtcTile.jsx` | Affichage avec indicateur de source |
| `database.rules.json` | Règles de sécurité Realtime Database |
| `docs/CACHE_ARCHITECTURE.md` | Cette documentation |

---

## 📝 Exemple d'Utilisation

```javascript
import useBtc24h from '../hooks/useBtc24h';

function MyComponent() {
  const { price, deltaPct, status, source } = useBtc24h();
  
  return (
    <div>
      <p>Prix: {price}</p>
      <p>Variation: {deltaPct}%</p>
      <p>Status: {status}</p>      {/* 'loading' | 'live' | 'cached' */}
      <p>Source: {source}</p>       {/* 'hyperliquid' | 'cache' */}
    </div>
  );
}
```

---

## 🎨 Indicateurs Visuels

| Status | Icône | Couleur | Signification |
|--------|-------|---------|---------------|
| `live` | 🟢 | Vert | Données en temps réel depuis Hyperliquid |
| `cached` | 📦 | Gris | Données du cache (Hyperliquid indisponible) |
| `loading` | ⏳ | Gris | Chargement initial |
| `error` | ❌ | Rouge | Erreur critique |

---

## 🔮 Évolutions Futures

### Phase 2 : Multi-coins
```javascript
// Hook générique
useTokenPrice('ETH'); // ✅
useTokenPrice('SOL'); // ✅
useTokenPrice('BTC'); // ✅
```

### Phase 3 : Historique
```javascript
/priceCache/{coin}/history/{timestamp}
```

### Phase 4 : Analytics
- Temps moyen de réponse Hyperliquid
- Taux d'utilisation du cache
- Alertes si cache utilisé trop souvent
