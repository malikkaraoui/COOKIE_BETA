import { Routes, Route, Navigate } from 'react-router-dom'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Page1 from '../pages/page1'
import Page2 from '../pages/page2'
import ProfilePage from '../pages/ProfilePage'

export default function AppLayout() {
  return (
    <div className="app">
      <Topbar />

      <div className="layout">
        <Sidebar />

        <main className="page">
          <Routes>
            {/* redirection par défaut vers /page1 */}
            <Route path="/" element={<Navigate to="/page1" replace />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
