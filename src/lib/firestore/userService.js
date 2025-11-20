// Service Firestore pour la gestion des utilisateurs
// Architecture scalable avec Firebase Auth UID comme clé unique
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../config/firebase'

/**
 * Extrait le prénom depuis le displayName de Google
 * Gère les cas : "Malik Karaoui" → "Malik", "Jean-Pierre Dupont" → "Jean-Pierre"
 */
export function extractFirstName(displayName) {
  if (!displayName) return ''
  const parts = displayName.trim().split(' ')
  return parts[0] || ''
}

/**
 * Extrait le nom de famille depuis le displayName de Google
 * Gère les cas : "Malik Karaoui" → "Karaoui", "Jean-Pierre Dupont" → "Dupont"
 */
export function extractLastName(displayName) {
  if (!displayName) return ''
  const parts = displayName.trim().split(' ')
  return parts.slice(1).join(' ') || ''
}

/**
 * Crée ou met à jour le profil utilisateur dans Firestore
 * Appelé automatiquement lors de la première connexion Google
 * 
 * @param {Object} user - Objet user de Firebase Auth
 * @returns {Promise<void>}
 */
export async function createOrUpdateUserProfile(user) {
  if (!user || !user.uid) {
    throw new Error('User object is required with uid')
  }

  const userRef = doc(db, 'users', user.uid)
  
  try {
    // Vérifier si le profil existe déjà
    const userSnap = await getDoc(userRef)
    
    if (userSnap.exists()) {
      // Mise à jour : lastLoginAt, photoURL ET nom/prénom (au cas où changés sur Google)
      await updateDoc(userRef, {
        firstName: extractFirstName(user.displayName),
        lastName: extractLastName(user.displayName),
        photoURL: user.photoURL || null,
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    } else {
      // Création : nouveau profil avec toutes les données de base
      await setDoc(userRef, {
        email: user.email || '',
        firstName: extractFirstName(user.displayName),
        lastName: extractLastName(user.displayName),
        photoURL: user.photoURL || null,
        birthDate: null, // À renseigner par l'utilisateur
        authProvider: 'google',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        isActive: true,
      })
    }
  } catch (error) {
    console.error('Erreur lors de la création/mise à jour du profil:', error)
    throw error
  }
}

/**
 * Récupère le profil utilisateur depuis Firestore
 * 
 * @param {string} uid - Firebase Auth UID
 * @returns {Promise<Object|null>} - Données du profil ou null si non trouvé
 */
export async function getUserProfile(uid) {
  if (!uid) {
    throw new Error('UID is required')
  }

  const userRef = doc(db, 'users', uid)
  
  try {
    const userSnap = await getDoc(userRef)
    
    if (userSnap.exists()) {
      return {
        uid,
        ...userSnap.data(),
      }
    }
    
    return null
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error)
    throw error
  }
}

/**
 * Met à jour les informations du profil utilisateur
 * 
 * @param {string} uid - Firebase Auth UID
 * @param {Object} data - Données à mettre à jour (firstName, lastName, birthDate, etc.)
 * @returns {Promise<void>}
 */
export async function updateUserProfile(uid, data) {
  if (!uid) {
    throw new Error('UID is required')
  }

  const userRef = doc(db, 'users', uid)
  
  try {
    // Ajouter automatiquement le timestamp de mise à jour
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error)
    throw error
  }
}

/**
 * Calcule l'âge depuis une date de naissance
 * 
 * @param {Date|string} birthDate - Date de naissance (format ISO ou objet Date)
 * @returns {number|null} - Âge en années ou null si invalide
 */
export function calculateAge(birthDate) {
  if (!birthDate) return null
  
  const birth = new Date(birthDate)
  const today = new Date()
  
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  // Ajuster si l'anniversaire n'est pas encore passé cette année
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age >= 0 ? age : null
}
