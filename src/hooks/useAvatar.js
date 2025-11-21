// Hook pour gérer l'avatar utilisateur avec fallback
// Utilise le profil Firebase en priorité pour éviter le rate limit Google
import { useUserProfile } from './useUserProfile'
import { useAuth } from './useAuth'

export function useAvatar() {
  const { user } = useAuth()
  const { profile } = useUserProfile()

  // Utiliser la photo du profil Firebase en priorité (évite le rate limit Google)
  const avatarURL = profile?.photoURL || user?.photoURL || null

  // Générer un avatar SVG avec l'initiale du prénom
  const generateFallbackAvatar = (size = 40) => {
    const firstName = profile?.firstName || user?.displayName?.split(' ')[0] || 'U'
    const initial = firstName.charAt(0).toUpperCase()
    const fontSize = Math.floor(size * 0.4)
    
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"%3E%3Ccircle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="%23666"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="${fontSize}" font-family="Arial"%3E${initial}%3C/text%3E%3C/svg%3E`
  }

  // Gestionnaire d'erreur pour les balises <img>
  const handleImageError = (e, size = 40) => {
    e.target.src = generateFallbackAvatar(size)
    e.target.onerror = null // Éviter les boucles infinies
  }

  return {
    avatarURL,
    generateFallbackAvatar,
    handleImageError,
    firstName: profile?.firstName || user?.displayName?.split(' ')[0] || 'Utilisateur'
  }
}
