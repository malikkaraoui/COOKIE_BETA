// Logique métier : Calculs de variations de prix
// Réutilisable pour tous les tokens (BTC, ETH, etc.)

/**
 * Calcule la variation absolue et en pourcentage entre deux prix
 * 
 * @param {number} currentPrice - Prix actuel
 * @param {number} referencePrice - Prix de référence (ex: il y a 24h)
 * @returns {{ deltaAbs: number, deltaPct: number } | null}
 */
export function calculatePriceChange(currentPrice, referencePrice) {
  if (currentPrice == null || referencePrice == null || referencePrice === 0) {
    return null
  }

  const deltaAbs = currentPrice - referencePrice
  const deltaPct = ((currentPrice / referencePrice - 1) * 100)

  return {
    deltaAbs,
    deltaPct
  }
}

/**
 * Formate un pourcentage de variation avec signe et couleur
 * 
 * @param {number} deltaPct - Variation en pourcentage
 * @returns {{ text: string, color: 'green' | 'red' | 'gray', sign: '+' | '-' | '' }}
 */
export function formatPriceChange(deltaPct) {
  if (deltaPct == null) {
    return { text: '--', color: 'gray', sign: '' }
  }

  const isPositive = deltaPct >= 0
  const sign = isPositive ? '+' : ''
  const color = isPositive ? 'green' : 'red'
  const text = `${sign}${deltaPct.toFixed(2)}%`

  return { text, color, sign }
}

/**
 * Formate un prix en USD avec séparateurs de milliers
 * 
 * @param {number} price - Prix à formater
 * @param {number} decimals - Nombre de décimales (défaut: 2)
 * @returns {string}
 */
export function formatPrice(price, decimals = 2) {
  if (price == null) return '--'
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(price)
}
