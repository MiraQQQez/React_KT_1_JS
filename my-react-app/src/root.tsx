import { NavLink, Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <div id="main-page">
      <h2>My Students App</h2>
      <hr />
      <div id="layout">
        <aside id="sidebar">
          <nav>
            <NavLink to="/students" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Students
            </NavLink>
            <NavLink to="/teachers" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Teachers
            </NavLink>
          </nav>
        </aside>
        <main id="detail">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
