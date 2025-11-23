import { Routes, Route, Navigate } from 'react-router-dom'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Page1 from '../pages/page1'
import Page2 from '../pages/page2'
import Page4 from '../pages/page4'
import ProfilePage from '../pages/ProfilePage'

export default function AppLayout() {
  return (
    <div className="app">
      <Topbar />

      <div className="layout">
        <Sidebar />

        <main className="page">
          <Routes>
            {/* redirection par défaut vers Marmiton Communautaire */}
            <Route path="/" element={<Navigate to="/MarmitonCommunautaire" replace />} />
            <Route path="/MarmitonCommunautaire" element={<Page1 />} />
            <Route path="/MaCuisine" element={<Page2 />} />
            <Route path="/BinanceToken" element={<Page4 />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
