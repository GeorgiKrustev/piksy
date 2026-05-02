import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout      from './layouts/AppLayout'
import BuilderLayout  from './layouts/BuilderLayout'
import Home           from './pages/Home'
import PresentsHub    from './pages/PresentsHub'
import Gifts          from './pages/Gifts'
import Settings       from './pages/Settings'
import BuilderPage    from './pages/builder/BuilderPage'
import PresentViewer  from './pages/PresentViewer'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standard app shell (with sidebar) */}
        <Route element={<AppLayout />}>
          <Route index                element={<Home />} />
          <Route path="/presents"     element={<PresentsHub />} />
          <Route path="/gifts"        element={<Gifts />} />
          <Route path="/settings"     element={<Settings />} />
        </Route>

        {/* Full-screen builder — no sidebar */}
        <Route element={<BuilderLayout />}>
          <Route path="/builder/:id" element={<BuilderPage />} />
        </Route>

        {/* Public present viewer — sealed, no app chrome */}
        <Route path="/:slug" element={<PresentViewer />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
