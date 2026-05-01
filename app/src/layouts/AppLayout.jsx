import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar'

/**
 * Main app shell — fixed sidebar + scrollable content area.
 * All standard pages render inside the <Outlet>.
 */
export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-cream-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
