# Documentation Drag & Drop Hooks

## Vue d'ensemble

Système de drag & drop réutilisable basé sur deux hooks complémentaires :
- **`useDraggable`** : Rend un élément glissable (draggable)
- **`useDropZone`** : Crée une zone de dépôt (drop zone)

Architecture découplée pour faciliter la réutilisation dans n'importe quel composant.

---

## 🎯 `useDraggable`

Hook pour rendre un élément draggable avec feedback visuel automatique.

### Import
```javascript
import { useDraggable } from '../hooks/useDraggable'
```

### Signature
```javascript
const { isDragging, dragHandlers, dragProps } = useDraggable(enabled)
```

### Paramètres
- **`enabled`** (boolean, défaut: `true`) : Active/désactive le drag

### Retour
- **`isDragging`** (boolean) : `true` pendant le drag
- **`dragHandlers`** (object) : Props à spreader sur l'élément
  - `draggable` (boolean)
  - `onDragStart` (function)
  - `onDragEnd` (function)
- **`dragProps`** (object) : Styles CSS recommandés pour feedback visuel
  - `opacity`, `cursor`, `transform`, `transition`

### Exemple : TokenTile draggable
```jsx
import { useDraggable } from '../hooks/useDraggable'

function TokenTile({ symbol, draggable = false }) {
  const { dragHandlers, dragProps } = useDraggable(draggable)

  return (
    <div 
      style={{ ...baseStyles, ...dragProps }}
      {...dragHandlers}
      onDragStart={(e) => dragHandlers.onDragStart(e, symbol)}
    >
      {symbol}
    </div>
  )
}
```

**Note** : Vous devez appeler `onDragStart` manuellement pour passer les données à transférer.

---

## 📦 `useDropZone`

Hook pour créer une zone de drop avec callback et feedback visuel.

### Import
```javascript
import { useDropZone } from '../hooks/useDropZone'
```

### Signature
```javascript
const { isActive, dropHandlers, dropProps } = useDropZone(onDrop, options)
```

### Paramètres
- **`onDrop`** (function) : Callback appelé avec les données droppées
  - Signature : `(data: string) => void`
- **`options`** (object, optionnel) :
  - `enabled` (boolean, défaut: `true`) : Active/désactive la zone
  - `onEnter` (function) : Callback quand drag entre dans la zone
  - `onLeave` (function) : Callback quand drag sort de la zone

### Retour
- **`isActive`** (boolean) : `true` quand drag au-dessus de la zone
- **`dropHandlers`** (object) : Props à spreader sur l'élément
  - `onDragOver` (function)
  - `onDragLeave` (function)
  - `onDrop` (function)
- **`dropProps`** (object) : Styles CSS recommandés pour feedback visuel
  - `background`, `border`, `transition`

### Exemple : Zone de drop avec shake
```jsx
import { useState } from 'react'
import { useDropZone } from '../hooks/useDropZone'
import { useAuth } from '../hooks/useAuth'

function DropZoneLink({ onAddToken }) {
  const { user } = useAuth()
  const [isShaking, setIsShaking] = useState(false)
  
  const { isActive, dropHandlers, dropProps } = useDropZone(
    (symbol) => {
      if (!user) {
        alert('Veuillez vous connecter')
        return
      }
      onAddToken(symbol)
    },
    {
      enabled: true,
      onEnter: () => setIsShaking(true),
      onLeave: () => setIsShaking(false)
    }
  )

  return (
    <div 
      style={{ 
        padding: '8px',
        borderRadius: '8px',
        ...dropProps,
        animation: isShaking ? 'shake 0.5s infinite' : 'none'
      }}
      {...dropHandlers}
    >
      Drop here!
    </div>
  )
}
```

---

## 🎨 Styles CSS recommandés

Les hooks retournent des props CSS dans `dragProps` et `dropProps`, mais vous pouvez les personnaliser :

### Draggable
```css
/* Feedback pendant le drag */
opacity: 0.5;
cursor: grab;
transform: scale(0.95);
transition: all 0.2s ease;
```

### Drop Zone
```css
/* État actif (drag au-dessus) */
background: rgba(34, 197, 94, 0.1);
border: 2px dashed #22c55e;
transition: all 0.2s ease;
```

### Animation shake (optionnelle)
Définir dans `index.css` :
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
```

---

## 📋 Cas d'usage

### 1. Tokens draggables vers sidebar
```jsx
// Page avec tokens
<TokenTile symbol="BTC" draggable={true} />

// Sidebar avec drop zone
const { addToken } = useSelectedTokens()
const { user } = useAuth()

const { dropHandlers, dropProps } = useDropZone(
  (symbol) => {
    if (!user) {
      alert('Connectez-vous d\'abord')
      return
    }
    addToken(symbol)
  }
)

<div {...dropHandlers} style={dropProps}>
  Ma cuisine
</div>
```

### 2. Réorganisation par drag & drop
```jsx
// Item réorganisable
const { dragHandlers, dragProps } = useDraggable(true)

<div 
  {...dragHandlers}
  style={dragProps}
  onDragStart={(e) => dragHandlers.onDragStart(e, item.id)}
>
  {item.name}
</div>

// Zone de drop pour réorganiser
const { dropHandlers } = useDropZone((itemId) => {
  reorderItems(itemId, targetPosition)
})

<div {...dropHandlers}>
  Drop to reorder
</div>
```

### 3. Upload de fichiers par drag & drop
```jsx
const { dropHandlers, dropProps } = useDropZone(
  (data) => {
    // data contient le contenu text/plain
    console.log('Dropped:', data)
  },
  {
    onEnter: () => setHighlight(true),
    onLeave: () => setHighlight(false)
  }
)

<div {...dropHandlers} style={dropProps}>
  Drop files here
</div>
```

---

## ✅ Bonnes pratiques

1. **Toujours vérifier l'authentification** dans `onDrop` si nécessaire
2. **Utiliser `onEnter`/`onLeave`** pour feedback visuel (shake, highlight)
3. **Spreader `dragHandlers` et `dropHandlers`** au lieu de définir manuellement les événements
4. **Combiner `dragProps`/`dropProps`** avec vos styles via spread : `{...baseStyles, ...dragProps}`
5. **Appeler `onDragStart` manuellement** avec les données à transférer

---

## 🔧 Personnalisation avancée

### Désactiver conditionnellement
```jsx
const { dragHandlers } = useDraggable(user !== null) // Drag seulement si connecté
const { dropHandlers } = useDropZone(onDrop, { enabled: !isFull }) // Drop seulement si pas plein
```

### Feedback visuel personnalisé
```jsx
const { isActive } = useDropZone(onDrop)

<div style={{
  background: isActive ? '#custom-color' : 'transparent',
  boxShadow: isActive ? '0 0 20px rgba(34, 197, 94, 0.5)' : 'none'
}}>
  Custom feedback
</div>
```

### Chaînage d'actions
```jsx
const { dropHandlers } = useDropZone(
  (symbol) => {
    addToken(symbol)
    trackAnalytics('token_added', { symbol })
    showNotification(`${symbol} ajouté !`)
  },
  {
    onEnter: () => {
      setHighlight(true)
      playSound('hover')
    },
    onLeave: () => {
      setHighlight(false)
    }
  }
)
```

---

## 📦 Architecture

```
src/
├── hooks/
│   ├── useDraggable.js      ← Hook pour éléments draggables
│   ├── useDropZone.js       ← Hook pour zones de drop
│   └── ...
├── elements/
│   └── TokenTile.jsx        ← Utilise useDraggable
├── components/
│   └── Sidebar.jsx          ← Utilise useDropZone
└── docs/
    └── DRAG_DROP_HOOKS.md   ← Cette doc
```

---

## 🚀 Évolutions futures possibles

- Support multi-drop (plusieurs zones actives simultanément)
- Support de types de données autres que `text/plain` (fichiers, images)
- Animations de transition entre drag source et drop zone
- Mode "swap" pour échanger deux éléments par drag & drop
- Gestionnaire de collision (empêcher drop si zone pleine)
