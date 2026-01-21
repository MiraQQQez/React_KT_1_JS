import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { selectAllStudents } from '../store/studentsSlice'
import { NewStudentForm } from './NewStudentForm'
import { TeacherForStudent } from './TeacherForStudent'
import { UserVotes } from './UserVotes'

export const StudentsList = () => {
  const students = useAppSelector(selectAllStudents)

  const dispStudents = students.map((student) => (
    <div key={student.id}>
      <h3>
        <Link to={`${student.id}`}>
          {student.name} {student.surname}
        </Link>
      </h3>
      <p>Id: {student.id}</p>
      <p>Возраст: {student.age}</p>
      <p>Специальность: {student.specialty}</p>
      <p>
        Преподаватель: <TeacherForStudent studentId={student.id} />
      </p>
      <UserVotes studentId={student.id} />
    </div>
  ))

  return (
    <div>
      <NewStudentForm />
      <h2>Students</h2>
      {dispStudents}
    </div>
  )
}
