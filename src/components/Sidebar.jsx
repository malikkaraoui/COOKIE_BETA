import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useResizablePanel } from '../hooks/useResizablePanel'
import { useNavigation } from '../context/NavigationContext'
import { useSelectedTokens } from '../context/SelectedTokensContext'
import { useAuth } from '../hooks/useAuth'
import { useDropZone } from '../hooks/useDropZone'
import ProfileButton from '../auth/ProfileButton'
import LogoutButton from '../auth/LogoutButton'

export default function Sidebar() {
  // gestion du redimensionnement horizontal
  const { size: width, isResizing, startResizing } = useResizablePanel({
    min: 110,
    max: 420,
    initial: 200,
    axis: 'x', // on redimensionne sur l'axe horizontal
  })

  // info de routing actuelle (/page1, /page2, /page3, etc.)
  const location = useLocation()

  // logique métier globale (si tu veux réutiliser activePage ailleurs)
  const { setActivePage } = useNavigation()

  // Auth
  const { user } = useAuth()

  // Gestion tokens sélectionnés et drop zone
  const { addToken, count } = useSelectedTokens()
  const [isShaking, setIsShaking] = useState(false)
  
  const { isActive: isDropZoneActive, dropHandlers, dropProps } = useDropZone(
    (symbol) => {
      // Vérifier si l'utilisateur est connecté
      if (!user) {
        alert('Veuillez vous connecter pour ajouter des tokens à votre cuisine')
        return
      }
      addToken(symbol)
    },
    {
      enabled: true,
      onEnter: () => setIsShaking(true),
      onLeave: () => setIsShaking(false)
    }
  )

  const links = [
    { to: '/MarmitonCommunautaire', label: 'Marmiton Communautaire' },
    { to: '/MaCuisine', label: 'Ma cuisine', dropZone: true },
    { to: '/BinanceToken', label: 'Binance liste token' },
  ]

  return (
    <>
      <nav className="sidebar" style={{ width }}>
        <div className="sidebar-inner">
          {links.map(({ to, label, dropZone }) => {
            const active = location.pathname === to
            const isDropTarget = dropZone && isDropZoneActive

            return (
              <div
                key={to}
                style={{
                  position: 'relative',
                  padding: dropZone ? '8px' : '0',
                  borderRadius: dropZone ? '8px' : '0',
                  ...(dropZone ? dropProps : {})
                }}
                {...(dropZone ? dropHandlers : {})}
              >
                <Link
                  to={to}
                  className={`nav-link ${active ? 'active' : ''}`}
                  style={{
                    animation: isShaking && dropZone ? 'shake 0.5s infinite' : 'none'
                  }}
                  onClick={() => setActivePage(to)}
                >
                  {label}
                  {dropZone && count > 0 && (
                    <span style={{
                      marginLeft: '8px',
                      padding: '2px 8px',
                      background: '#22c55e',
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>
                      {count}/{4}
                    </span>
                  )}
                </Link>
              </div>
            )
          })}
          
          <div className="sidebar-spacer" />
          <ProfileButton />
          <LogoutButton />
        </div>
      </nav>

      <div
        className={`sidebar-resizer ${isResizing ? 'is-resizing' : ''}`}
        onMouseDown={startResizing}
      />
    </>
  )
}
