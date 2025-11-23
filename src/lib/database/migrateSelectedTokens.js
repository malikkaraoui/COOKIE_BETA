/**
 * Script de migration selectedTokens
 * Convertit les objets Firebase {0: "BNB:binance"} en vrais arrays ["BNB:binance"]
 * À exécuter une seule fois
 */

import { ref, get, set } from 'firebase/database'
import { db } from '../../config/firebase'

export async function migrateSelectedTokens(uid) {
  if (!uid) {
    console.warn('⚠️ Pas de UID, migration ignorée')
    return
  }

  try {
    const tokensRef = ref(db, `users/${uid}/selectedTokens`)
    const snapshot = await get(tokensRef)

    if (!snapshot.exists()) {
      console.log('✅ Pas de selectedTokens à migrer')
      return
    }

    const data = snapshot.val()

    // Si déjà un array, rien à faire
    if (Array.isArray(data)) {
      console.log('✅ selectedTokens déjà au bon format (array)')
      return
    }

    // Convertir objet {0: "BNB:binance", 1: "ETH:hyperliquid"} en array
    if (typeof data === 'object' && data !== null) {
      const tokens = Object.values(data).filter(Boolean)
      
      console.log('🔄 Migration selectedTokens:', data, '→', tokens)
      
      // Réécrire en tant qu'array
      await set(tokensRef, tokens.length > 0 ? tokens : null)
      
      console.log('✅ Migration réussie!')
    }
  } catch (error) {
    console.error('❌ Erreur migration selectedTokens:', error)
  }
}
