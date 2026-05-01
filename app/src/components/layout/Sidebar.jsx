import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Gift, Sparkles, Settings, Plus } from 'lucide-react'
import { clsx } from 'clsx'
import { getInitials } from '../../utils/helpers'
import { MOCK_USER } from '../../data/mockData'
import { Button } from '../ui/Button'

const NAV = [
  { label: 'Home',     icon: Home,     to: '/' },
  { label: 'Presents', icon: Gift,     to: '/presents' },
  { label: 'Gifts',    icon: Sparkles, to: '/gifts' },
]

const SECONDARY = [
  { label: 'Settings', icon: Settings, to: '/settings' },
]

function NavItem({ icon: Icon, label, to, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 select-none',
          isActive
            ? 'bg-terracotta-50 text-terracotta-600'
            : 'text-stone-500 hover:bg-cream-200 hover:text-stone-700'
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={clsx('w-4 h-4 shrink-0', isActive ? 'text-terracotta-500' : 'text-stone-400')} />
          {label}
        </>
      )}
    </NavLink>
  )
}

export function Sidebar() {
  const navigate = useNavigate()
  const user     = MOCK_USER

  return (
    <aside className="w-sidebar shrink-0 flex flex-col h-screen bg-white border-r border-stone-100 py-5 overflow-hidden">
      {/* Logo */}
      <div className="px-5 mb-6">
        <span className="font-serif italic text-xl text-stone-800 tracking-tight">Piksy</span>
        <span className="ml-1.5 text-xs font-medium text-terracotta-400 bg-terracotta-50 px-1.5 py-0.5 rounded-md">beta</span>
      </div>

      {/* Quick create */}
      <div className="px-3 mb-5">
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => navigate('/presents')}
        >
          New Present
        </Button>
      </div>

      {/* Primary nav */}
      <nav className="px-2 flex flex-col gap-0.5 flex-1">
        {NAV.map((item) => (
          <NavItem key={item.to} {...item} end={item.to === '/'} />
        ))}
      </nav>

      {/* Secondary nav + user */}
      <div className="px-2 flex flex-col gap-0.5">
        {SECONDARY.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        {/* User row */}
        <div className="mt-3 px-3 py-2.5 flex items-center gap-3 rounded-xl hover:bg-cream-200 transition-colors cursor-default select-none">
          <div className="w-7 h-7 rounded-full bg-terracotta-100 flex items-center justify-center text-terracotta-600 text-xs font-semibold shrink-0">
            {getInitials(user.name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-stone-700 truncate">{user.name}</p>
            <p className="text-xs text-stone-400 truncate">{user.plan === 'free' ? 'Free plan' : 'Pro'}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
