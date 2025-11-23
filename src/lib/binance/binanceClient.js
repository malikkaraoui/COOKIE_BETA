/**
 * Service Binance Spot API
 * Récupère les prix et statistiques 24h depuis Binance
 */

import { BINANCE_ENDPOINTS } from '../../config/binanceConfig'

/**
 * Récupère le prix + variation 24h d'un symbole Binance
 * 
 * @param {string} symbol - Symbole Binance (ex: 'BNBUSDT')
 * @returns {Promise<Object>} - { symbol, price, priceChange, priceChangePercent }
 */
export async function getBinanceTicker24hr(symbol) {
  try {
    const url = `${BINANCE_ENDPOINTS.TICKER_24HR}?symbol=${symbol}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Binance API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    return {
      symbol: data.symbol,
      price: parseFloat(data.lastPrice),
      priceChange: parseFloat(data.priceChange),
      priceChangePercent: parseFloat(data.priceChangePercent),
      prevClosePrice: parseFloat(data.prevClosePrice),
      timestamp: data.closeTime
    }
  } catch (error) {
    console.error(`❌ Erreur Binance API pour ${symbol}:`, error)
    throw error
  }
}

/**
 * Récupère uniquement le dernier prix d'un symbole
 * 
 * @param {string} symbol - Symbole Binance (ex: 'BNBUSDT')
 * @returns {Promise<number>} - Prix actuel
 */
export async function getBinancePrice(symbol) {
  try {
    const url = `${BINANCE_ENDPOINTS.PRICE}?symbol=${symbol}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Binance API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    return parseFloat(data.price)
  } catch (error) {
    console.error(`❌ Erreur Binance API pour ${symbol}:`, error)
    throw error
  }
}
