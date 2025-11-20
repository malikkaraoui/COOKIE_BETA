// Hook personnalisé pour la logique d'authentification
// Similaire à useResizablePanel : toute la logique métier est isolée ici
import { useState } from 'react'
import { signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'
import { useAuthContext } from '../auth/AuthContext'

export function useAuth() {
  // On récupère l'état global depuis le contexte
  const { user, loading } = useAuthContext()
  
  // État local pour les erreurs
  const [error, setError] = useState(null)

  // Connexion avec Google via popup
  const signInWithGoogle = async () => {
    try {
      setError(null)
      const result = await signInWithPopup(auth, googleProvider)
      return result.user
    } catch (err) {
      setError(err.message)
      console.error('Erreur de connexion Google:', err)
      throw err
    }
  }

  // Déconnexion
  const signOut = async () => {
    try {
      setError(null)
      await firebaseSignOut(auth)
    } catch (err) {
      setError(err.message)
      console.error('Erreur de déconnexion:', err)
      throw err
    }
  }

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signOut,
  }
}
