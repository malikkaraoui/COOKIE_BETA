// Composant générique TokenTile - affiche prix, variation et statut d'un token
// Utilise le hook useToken pour récupérer les données
import { useToken } from '../hooks/useToken'
import { useTokenIcon } from '../hooks/useTokenIcon'

function narrowSpaces(str) { return str.replace(/\u00A0/g, "\u202F") }
function fmtUSD(n) { return narrowSpaces(n.toLocaleString('fr-FR', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })) }
function fmtSignedAbs(n, d = 0) {
  const s = n >= 0 ? '' : '-'
  const a = Math.abs(n)
  return `${s}${a.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d })}`
}

export default function TokenTile({ symbol }) {
  const token = useToken(symbol)
  const { iconPath, handleError } = useTokenIcon(symbol)
  
  const hasDelta = token.deltaAbs != null && token.deltaPct != null
  const color = !hasDelta ? '#94a3b8' : token.deltaAbs >= 0 ? '#22c55e' : '#ef4444'

  // Statut lisible
  let statusLabel = 'Chargement…'
  if (token.error) statusLabel = 'Erreur'
  else if (token.status === 'live') statusLabel = 'Live'
  else if (token.status === 'cached') statusLabel = 'Cache'
  else if (token.status === 'loading') statusLabel = 'Initialisation'

  // Source (hyperliquid vs cache navigateur)
  const sourceLabel = token.source === 'live' ? 'Hyperliquid' : 'Navigateur'

  return (
    <div style={styles.card}>
      <img 
        src={iconPath} 
        alt={symbol} 
        width={40} 
        height={40} 
        style={styles.icon}
        onError={handleError}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={styles.name}>{token.name}</div>
        <div style={{ ...styles.delta, color, minHeight: 16 }}>
          {hasDelta ? `(${fmtSignedAbs(token.deltaAbs, 0)} / ${fmtSignedAbs(token.deltaPct, 2)}%)` : 'Variation...'}
        </div>
        <div style={styles.price}>{token.price != null ? fmtUSD(token.price) : '—'}</div>
        <div style={styles.sub}>
          {token.error && <span style={{ color: '#ef4444' }}>⛔ {token.error}</span>}
          {!token.error && (
            <span>
              <span style={{ color: token.status === 'live' ? '#22c55e' : '#94a3b8' }}>{statusLabel}</span>
              {' • '}
              <span style={{ color: '#64748b' }}>{sourceLabel}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: { display: 'flex', alignItems: 'center', padding: 12, background: '#0f172a', color: '#e5e7eb', borderRadius: 12, border: '1px solid #334155', width: 320, gap: 12 },
  icon: { borderRadius: '50%', flexShrink: 0 },
  name: { fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  delta: { fontSize: 13, marginBottom: 4 },
  price: { fontSize: 22, fontWeight: 700, lineHeight: 1.2 },
  sub: { fontSize: 11, color: '#94a3b8', marginTop: 2 }
}
