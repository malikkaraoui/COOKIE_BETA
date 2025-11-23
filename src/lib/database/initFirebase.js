/**
 * Script d'initialisation des nœuds Firebase
 * Crée priceTokenHyper et priceTokenBinance dans Realtime Database
 */

import { ref, set } from 'firebase/database'
import { db } from '../../config/firebase'

export async function initializePriceNodes() {
  try {
    console.log('🚀 Initialisation des nœuds Firebase...')
    
    // Initialiser priceTokenHyper avec un placeholder
    const hyperRef = ref(db, 'priceTokenHyper/_init')
    await set(hyperRef, {
      timestamp: Date.now(),
      initialized: true
    })
    console.log('✅ priceTokenHyper initialisé')
    
    // Initialiser priceTokenBinance avec un placeholder
    const binanceRef = ref(db, 'priceTokenBinance/_init')
    await set(binanceRef, {
      timestamp: Date.now(),
      initialized: true
    })
    console.log('✅ priceTokenBinance initialisé')
    
    console.log('🎉 Nœuds Firebase créés avec succès!')
    
  } catch (error) {
    console.error('❌ Erreur initialisation Firebase:', error)
  }
}
