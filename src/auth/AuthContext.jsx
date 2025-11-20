// Context d'authentification - gère l'état global de l'utilisateur connecté
// Pattern identique à NavigationContext : créer le context, le provider et le hook d'accès
import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import { createOrUpdateUserProfile } from '../lib/firestore/userService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Écoute les changements d'état d'authentification Firebase
  // S'exécute une seule fois au montage du composant
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Créer/mettre à jour le profil Firestore lors de la connexion
        try {
          await createOrUpdateUserProfile(currentUser)
        } catch (error) {
          console.error('Erreur lors de la sync du profil:', error)
        }
      }
      
      setUser(currentUser)
      setLoading(false)
    })

    // Nettoyage : arrête l'écoute quand le composant est démonté
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook d'accès au contexte (comme useNavigation)
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext doit être utilisé dans un AuthProvider')
  }
  return context
}
