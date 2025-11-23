/**
 * Script de nettoyage Firebase
 * Supprime les anciennes entrées SHIB, CAKE, DOGE de priceCache
 */

import { ref, remove } from 'firebase/database'
import { db } from '../../config/firebase'

export async function cleanupOldPriceCache() {
  try {
    console.log('🧹 Nettoyage des anciennes entrées priceCache...')
    
    const tokensToRemove = ['SHIB', 'DOGE', 'CAKE', 'BNB']
    
    for (const token of tokensToRemove) {
      const tokenRef = ref(db, `priceCache/${token}`)
      await remove(tokenRef)
      console.log(`✅ ${token} supprimé de priceCache`)
    }
    
    console.log('🎉 Nettoyage terminé!')
    
  } catch (error) {
    console.error('❌ Erreur nettoyage:', error)
  }
}
