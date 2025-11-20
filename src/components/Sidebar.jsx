import { Link, useLocation } from 'react-router-dom'
import { useResizablePanel } from '../hooks/useResizablePanel'
import { useNavigation } from '../context/NavigationContext'
import ProfileButton from '../auth/ProfileButton'
import LogoutButton from '../auth/LogoutButton'

export default function Sidebar() {
  // gestion du redimensionnement horizontal
  const { size: width, isResizing, startResizing } = useResizablePanel({
    min: 110,
    max: 420,
    initial: 200,
    axis: 'x', // on redimensionne sur l’axe horizontal
  })

  // info de routing actuelle (/page1, /page2, /page3, etc.)
  const location = useLocation()

  // logique métier globale (si tu veux réutiliser activePage ailleurs)
  const { setActivePage } = useNavigation()

  const links = [
    { to: '/page1', label: 'Marmiton Communautaire' },
    { to: '/page2', label: 'Ma cuisine' },
  ]

  return (
    <>
      <nav className="sidebar" style={{ width }}>
        <div className="sidebar-inner">
          {links.map(({ to, label }) => {
            const active = location.pathname === to

            return (
              <Link
                key={to}
                to={to}
                className={`nav-link ${active ? 'active' : ''}`}
                onClick={() => setActivePage(to)}
              >
                {label}
              </Link>
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
