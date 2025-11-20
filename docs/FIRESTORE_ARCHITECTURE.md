# 🔥 Architecture Firestore - COOKIE

## 📊 Structure de la base de données

### Collection `users`

Clé unique : **Firebase Auth UID** (pas de double clé)

```javascript
users/
└── {firebaseAuthUID}/
    ├── email: string
    ├── firstName: string           // Extrait de Google displayName
    ├── lastName: string            // Extrait de Google displayName
    ├── photoURL: string | null     // URL depuis Google
    ├── birthDate: timestamp | null // Date de naissance (à renseigner)
    ├── authProvider: "google"      // Méthode de connexion
    ├── createdAt: timestamp        // Date de création
    ├── updatedAt: timestamp        // Dernière mise à jour
    ├── lastLoginAt: timestamp      // Dernière connexion
    └── isActive: boolean           // Soft delete
```

## 🔐 Règles de sécurité

✅ **Lecture** : Tous les utilisateurs authentifiés  
✅ **Création** : Uniquement son propre profil  
✅ **Mise à jour** : Uniquement son propre profil  
❌ **Suppression** : Interdite (soft delete avec `isActive: false`)

### Champs immuables
- `email`
- `authProvider`
- `createdAt`

## 🚀 Flux de données

### 1. Première connexion Google
```
User se connecte → Firebase Auth crée UID
→ useUserProfile détecte nouveau user
→ Appelle createOrUpdateUserProfile()
→ Crée document users/{uid} dans Firestore
→ Extrait firstName/lastName depuis displayName
```

### 2. Connexions suivantes
```
User se connecte → Firebase Auth reconnaît UID
→ useUserProfile charge le profil existant
→ Met à jour lastLoginAt et photoURL
```

### 3. Mise à jour du profil
```
User modifie birthDate → updateProfile()
→ Met à jour users/{uid}/birthDate
→ Ajoute updatedAt: serverTimestamp()
```

## 📁 Fichiers créés

```
src/
├── lib/
│   └── firestore/
│       └── userService.js          # CRUD + extractFirstName/LastName + calculateAge
├── hooks/
│   └── useUserProfile.js           # Sync auto + updateProfile + refreshProfile
├── auth/
│   └── ProfileButton.jsx           # Bouton navigation vers /profile
└── pages/
    ├── ProfilePage.jsx             # Page profil avec formulaire
    └── ProfilePage.css             # Styles cohérents

firestore.rules                     # Règles de sécurité Firestore
```

## 🎯 Cas de figure gérés

| Cas | Comportement |
|-----|--------------|
| **Première connexion Google** | Création auto du profil Firestore |
| **Connexions suivantes** | Mise à jour `lastLoginAt` et `photoURL` |
| **Nom composé (Jean-Pierre)** | `extractFirstName()` gère le cas |
| **Prénom uniquement TopBar** | Affiche `profile.firstName` |
| **Photo de profil** | Synchronisée depuis Google à chaque login |
| **Date de naissance vide** | Input vide, message "Veuillez sélectionner..." |
| **Date de naissance renseignée** | Affichage + calcul automatique de l'âge |
| **User non connecté** | Bouton Profil masqué dans Sidebar |
| **User connecté** | Bouton Profil visible au-dessus de Déconnexion |

## 🔧 Déploiement Firestore

### 1. Déployer les règles de sécurité
```bash
firebase deploy --only firestore:rules
```

### 2. Créer les index (si nécessaire)
Les requêtes simples par UID ne nécessitent pas d'index composites.

## 📝 TODO futurs

- [ ] Ajouter des sous-collections `trades/`, `positions/`, `wallets/`
- [ ] Implémenter la collection `trades_global` pour analytics
- [ ] Ajouter `market_data/` pour le cache des prix
- [ ] Créer `aggregations/` pour les statistiques pré-calculées
- [ ] Mettre en place des Cloud Functions pour les calculs asynchrones
