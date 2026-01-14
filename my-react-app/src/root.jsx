import { StudentsList } from './students/StudentsList.jsx'
import { NewStudentForm } from './students/NewStudentForm.jsx'

export default function Root() {
  return (
    <div id="main-page">
      <h2>My Students App</h2>
      <hr />
      <NewStudentForm />
      <StudentsList />
    </div>
  )
}
