import { Link, Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <div id="main-page">
      <h2>My Students App</h2>
      <hr />
      <div id="layout">
        <aside id="sidebar">
          <nav>
            <Link to="/students">Students</Link>
          </nav>
        </aside>
        <main id="detail">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
