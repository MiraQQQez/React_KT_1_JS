import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { selectStudentById } from '../store/studentsSlice'
import { TeacherForStudent } from './TeacherForStudent'
import { UserVotes } from './UserVotes'

export const StudentPage = () => {
  const { studentId } = useParams()

  // Ищем студента по id из URL. Приводим к строке, т.к. id может быть числом или строкой (nanoid)
  const student = useAppSelector((state) => selectStudentById(state, studentId))

  if (!student) {
    return (
      <section>
        <h2>Студент не найден</h2>
        <p>Id: {studentId}</p>
      </section>
    )
  }

  return (
    <section>
      <h2>
        {student.name} {student.surname}
      </h2>
      <p>Id: {student.id}</p>
      <p>Возраст: {student.age}</p>
      <p>Специальность: {student.specialty}</p>
      <p>
        Преподаватель: <TeacherForStudent studentId={student.id} />
      </p>
      <UserVotes studentId={student.id} />
      <Link to="edit">Редактировать</Link>
    </section>
  )
}
