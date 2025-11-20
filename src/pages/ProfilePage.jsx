// Page Profil utilisateur
// Affiche et permet de modifier les informations du profil
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useUserProfile } from '../hooks/useUserProfile'
import { calculateAge } from '../lib/firestore/userService'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user } = useAuth()
  const { profile, loading, updating, updateProfile } = useUserProfile()
  
  const [birthDate, setBirthDate] = useState('')
  const [message, setMessage] = useState('')

  // Initialiser la date de naissance quand le profil est chargé
  useEffect(() => {
    if (profile?.birthDate) {
      // Convertir le timestamp Firestore en format YYYY-MM-DD pour l'input
      const date = profile.birthDate.toDate ? profile.birthDate.toDate() : new Date(profile.birthDate)
      setBirthDate(date.toISOString().split('T')[0])
    }
  }, [profile])

  const handleSave = async (e) => {
    e.preventDefault()
    
    if (!birthDate) {
      setMessage('Veuillez sélectionner une date de naissance')
      return
    }

    try {
      await updateProfile({
        birthDate: new Date(birthDate),
      })
      setMessage('✓ Profil enregistré avec succès !')
      setTimeout(() => setMessage(''), 4000)
    } catch (err) {
      console.error('Erreur mise à jour profil:', err)
      setMessage('Erreur lors de la mise à jour du profil')
    }
  }

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">Chargement du profil...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-error">
          Vous devez être connecté pour accéder à votre profil.
        </div>
      </div>
    )
  }

  const age = profile?.birthDate ? calculateAge(profile.birthDate.toDate ? profile.birthDate.toDate() : profile.birthDate) : null

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-title">Mon Profil</h1>

        <div className="profile-header">
          <img 
            src={profile?.photoURL || user.photoURL} 
            alt={profile?.firstName || 'Profil'} 
            className="profile-avatar-large"
          />
        </div>

        <form className="profile-form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">Prénom</label>
            <input 
              id="firstName"
              type="text" 
              className="form-input" 
              value={profile?.firstName || ''} 
              disabled
            />
            <span className="form-hint">Importé depuis votre compte Google</span>
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">Nom</label>
            <input 
              id="lastName"
              type="text" 
              className="form-input" 
              value={profile?.lastName || ''} 
              disabled
            />
            <span className="form-hint">Importé depuis votre compte Google</span>
          </div>

          <div className="form-group">
            <label htmlFor="birthDate" className="form-label">
              Date de naissance
              {age !== null && <span className="age-display">({age} ans)</span>}
            </label>
            <input 
              id="birthDate"
              type="date" 
              className="form-input" 
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]} // Pas de date future
            />
            <span className="form-hint">Cette information reste privée</span>
          </div>

          {message && (
            <div className={`form-message ${message.includes('succès') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            className="form-button" 
            disabled={updating}
          >
            {updating ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
      </div>
    </div>
  )
}
