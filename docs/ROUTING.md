# 🧭 Routing COOKIE - Convention de Nommage

## 📋 URLs Actuelles

| URL | Fichier | Description |
|-----|---------|-------------|
| `/` | - | Redirection vers `/MarmitonCommunautaire` |
| `/MarmitonCommunautaire` | `page1.jsx` | Liste complète des tokens Hyperliquid (draggable) |
| `/MaCuisine` | `page2.jsx` | Tokens sélectionnés par l'utilisateur (max 4) |
| `/BinanceToken` | `page4.jsx` | Liste des tokens depuis Binance Spot API |
| `/profile` | `ProfilePage.jsx` | Profil utilisateur (Google Auth) |

---

## ✅ Convention de Nommage

### Règle Générale
**Les URLs doivent être en PascalCase et décrire clairement la fonctionnalité**

### Exemples
- ✅ `/MarmitonCommunautaire` - Clair et descriptif
- ✅ `/MaCuisine` - Français, correspond au label sidebar
- ✅ `/BinanceToken` - Indique la source des données
- ❌ `/page1`, `/page2` - Trop générique, pas explicite
- ❌ `/marmiton-communautaire` - kebab-case (réservé pour les paramètres)
- ❌ `/marmiton_communautaire` - snake_case (éviter)

### Format
```
/[Nom]Descriptif[Source]
```

**Exemples :**
- `/MarmitonCommunautaire` → Nom de la page
- `/BinanceToken` → Source Binance + type Token
- `/HyperliquidOrderBook` → Source Hyperliquid + fonctionnalité

---

## 🚀 Ajouter une Nouvelle Route

### 1. Créer la page
```bash
src/pages/MaNouvellePage.jsx
```

### 2. Définir l'URL
```
URL : /MaNouvellePage
```

### 3. Modifier AppLayout.jsx
```jsx
import MaNouvellePage from '../pages/MaNouvellePage'

// Dans <Routes>
<Route path="/MaNouvellePage" element={<MaNouvellePage />} />
```

### 4. Ajouter au Sidebar (optionnel)
```jsx
const links = [
  // ...
  { to: '/MaNouvellePage', label: 'Ma Nouvelle Page' },
]
```

---

## 📖 Historique des Changements

### 23 novembre 2025
- ✅ `/page1` → `/MarmitonCommunautaire`
- ✅ `/page2` → `/MaCuisine`
- ✅ `/page4` → `/BinanceToken`
- ✅ Redirection racine `/` vers `/MarmitonCommunautaire`

### Raison
- URLs génériques (`/page1`, `/page2`) pas claires pour les nouveaux développeurs
- Convention PascalCase cohérente avec les noms de composants React
- Facilite la compréhension immédiate de la structure de l'app

---

## 🎯 Bonnes Pratiques

1. **Toujours utiliser PascalCase** pour les URLs
2. **Décrire la fonctionnalité** dans l'URL (pas de noms génériques)
3. **Synchroniser avec le label Sidebar** (même wording)
4. **Documenter les changements** dans ce fichier
5. **Tester les redirections** après modification

---

## 🔮 Routes Futures (Planifiées)

- `/HyperliquidOrderBook` - Carnet d'ordres BTC
- `/PortefeuilleOnChain` - Vue des balances blockchain
- `/Parametres` - Configuration utilisateur
- `/Statistiques` - Analytics des prix
