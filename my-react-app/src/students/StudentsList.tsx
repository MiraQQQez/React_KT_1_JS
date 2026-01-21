import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchStudents, selectAllStudents } from '../store/studentsSlice'
import { fetchTeachers } from '../store/teachersSlice'
import { NewStudentForm } from './NewStudentForm'
import { TeacherForStudent } from './TeacherForStudent'
import { UserVotes } from './UserVotes'

type StudentCardProps = {
  studentId: string | number
  name: string
  surname: string
  age: number
  specialty: string
}

const StudentCard = ({ studentId, name, surname, age, specialty }: StudentCardProps) => {
  return (
    <div>
      <h3>
        <Link to={`${studentId}`}>
          {name} {surname}
        </Link>
      </h3>
      <p>Id: {studentId}</p>
      <p>Возраст: {age}</p>
      <p>Специальность: {specialty}</p>
      <p>
        Преподаватель: <TeacherForStudent studentId={studentId} />
      </p>
      <UserVotes studentId={studentId} />
    </div>
  )
}

export const StudentsList = () => {
  const dispatch = useAppDispatch()
  const students = useAppSelector(selectAllStudents)
  const studentStatus = useAppSelector((state) => state.students.status)
  const error = useAppSelector((state) => state.students.error)
  const teachers = useAppSelector((state) => state.teachers)

  useEffect(() => {
    if (teachers.length === 0) {
      void dispatch(fetchTeachers())
    }

    if (studentStatus === 'idle') {
      void dispatch(fetchStudents())
    }
  }, [studentStatus, dispatch, teachers.length])

  let content: ReactNode = null

  if (studentStatus === 'loading') {
    content = <p>Загрузка...</p>
  } else if (studentStatus === 'succeeded') {
    content = students.map((student) => (
      <StudentCard
        key={student.id}
        studentId={student.id}
        name={student.name}
        surname={student.surname}
        age={student.age}
        specialty={student.specialty}
      />
    ))
  } else if (studentStatus === 'failed') {
    content = <p>{error}</p>
  }
  
  return (
    <div>
      <NewStudentForm />
      <h2>Students</h2>
      {content}
    </div>
  )
}
