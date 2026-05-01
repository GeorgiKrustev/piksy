import { Outlet, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { presentService } from '../services/presentService'

/**
 * Full-screen builder layout.
 * The step nav, editor panel, and preview panel are rendered by BuilderPage
 * (the <Outlet>), which has full access to the present via useBuilder().
 * This layout only provides the outer chrome (top bar with back link + present title).
 */
export default function BuilderLayout() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const present  = presentService.getById(id)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-cream-100">
      {/* Top chrome */}
      <header className="h-12 shrink-0 bg-white border-b border-stone-100 flex items-center gap-3 px-4">
        <button
          onClick={() => navigate('/presents')}
          className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Presents
        </button>
        <span className="text-stone-200">/</span>
        <span className="text-sm font-medium text-stone-700 truncate">
          {present?.title ?? 'Builder'}
        </span>
      </header>

      {/* Builder content fills remaining height */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
