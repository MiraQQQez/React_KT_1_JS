import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './root'
import { StudentsList } from './students/StudentsList'
import { StudentPage } from './students/StudentPage'
import { EditStudentForm } from './students/EditStudentForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Navigate to="students" replace /> },
      {
        path: 'students',
        element: <Outlet />,
        children: [
          { index: true, element: <StudentsList /> },
          { path: ':studentId', element: <StudentPage /> },
          { path: ':studentId/edit', element: <EditStudentForm /> },
        ],
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
