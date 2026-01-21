import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchStudents, selectAllStudents } from '../store/studentsSlice'
import { selectTeacherById } from '../store/teachersSlice'

export const TeacherPage = () => {
  const { teacherId } = useParams()
  const dispatch = useAppDispatch()
  const teacher = useAppSelector((state) => selectTeacherById(state, teacherId))
  const students = useAppSelector(selectAllStudents)
  const studentStatus = useAppSelector((state) => state.students.status)

  useEffect(() => {
    if (studentStatus === 'idle') {
      void dispatch(fetchStudents())
    }
  }, [studentStatus, dispatch])

  if (!teacher) {
    return (
      <section>
        <h2>Teacher not found</h2>
      </section>
    )
  }

  const teacherStudents = students.filter((student) => {
    const studentTeacher = student.teacher
    return String(studentTeacher) === String(teacher.id) || String(studentTeacher) === String(teacher.name)
  })

  const studentsToRender = teacherStudents.map((student) => (
    <li key={student.id}>
      <Link to={`/students/${student.id}`}>
        {student.name} {student.surname}
      </Link>
    </li>
  ))

  return (
    <section>
      <h2>{teacher.name}</h2>
      <h3>{teacher.subject}</h3>
      {studentStatus === 'loading' ? <p>Загрузка...</p> : <ul>{studentsToRender}</ul>}
      <p>
        <Link to="/teachers">Назад к списку</Link>
      </p>
    </section>
  )
}
