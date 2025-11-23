/**
 * Page Binance - Liste des tokens depuis Binance Spot API
 * Affiche BNB avec son prix et variation 24h
 * Support drag & drop vers "Ma cuisine"
 */

import { useBnbPrice } from '../hooks/useBnbPrice'
import { useDraggable } from '../hooks/useDraggable'

export default function Page4() {
  const { price, priceChangePercent, loading, error } = useBnbPrice()
  const { dragHandlers, dragProps } = useDraggable(true)

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        marginBottom: '40px',
        color: '#fff'
      }}>
        Binance liste token
      </h1>

      {/* BNB Token Card */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          border: '1px solid rgba(243, 186, 47, 0.2)',
          ...dragProps
        }}
        {...dragHandlers}
        onDragStart={(e) => dragHandlers.onDragStart(e, 'BNB:binance')}
      >
        {/* Logo BNB */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#F3BA2F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: '0 5px 15px rgba(243, 186, 47, 0.4)'
        }}>
          <span style={{
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#000'
          }}>
            BNB
          </span>
        </div>

        {/* Nom */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#F3BA2F',
          marginBottom: '10px'
        }}>
          BNB
        </h2>

        {/* Prix */}
        {loading ? (
          <div style={{ color: '#888' }}>Chargement...</div>
        ) : error ? (
          <div style={{ color: '#ff4444' }}>Erreur: {error}</div>
        ) : (
          <>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '10px'
            }}>
              ${price?.toFixed(2)}
            </div>

            {/* Variation 24h */}
            <div style={{
              fontSize: '20px',
              fontWeight: '600',
              color: priceChangePercent >= 0 ? '#00ff88' : '#ff4444',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>{priceChangePercent >= 0 ? '↑' : '↓'}</span>
              <span>{priceChangePercent >= 0 ? '+' : ''}{priceChangePercent?.toFixed(2)}%</span>
              <span style={{ color: '#888', fontSize: '16px' }}>(24h)</span>
            </div>
          </>
        )}

        {/* Source */}
        <div style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          color: '#888',
          fontSize: '14px'
        }}>
          Source: Binance Spot API
        </div>
      </div>
    </div>
  )
}
