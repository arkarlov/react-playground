import { NavLink, Outlet } from 'react-router'
import './App.css'

function navLinkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
    : 'text-gray-600 hover:text-blue-600'
}

function App() {
  return (
    <div className="h-full flex-col justify-start">
      <nav>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>{' '}
        |{' '}
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
      </nav>
      <main>
        <h2>Layout</h2>
        <div className="p-4 m-4 bg-gray-100">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default App
