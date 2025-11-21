// Configuration centralisée des tokens supportés
// Utilisé par MarketDataContext pour polling API et cache Firebase

export const TOKENS = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    color: '#F7931A',
    decimals: 2
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    color: '#627EEA',
    decimals: 2
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    color: '#14F195',
    decimals: 2
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    color: '#F3BA2F',
    decimals: 2
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    color: '#8247E5',
    decimals: 2
  },
  {
    symbol: 'kPEPE',
    name: 'Pepe',
    color: '#3D9970',
    decimals: 2
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    color: '#E84142',
    decimals: 2
  },
  {
    symbol: 'ATOM',
    name: 'Cosmos',
    color: '#2E3148',
    decimals: 2
  },
  {
    symbol: 'APT',
    name: 'Aptos',
    color: '#00D4AA',
    decimals: 2
  },
  {
    symbol: 'ARB',
    name: 'Arbitrum',
    color: '#28A0F0',
    decimals: 2
  }
]

// Helper : récupérer config d'un token par symbole
export function getTokenConfig(symbol) {
  return TOKENS.find(t => t.symbol === symbol)
}

// Helper : liste des symboles pour requête API
export function getTokenSymbols() {
  return TOKENS.map(t => t.symbol)
}
