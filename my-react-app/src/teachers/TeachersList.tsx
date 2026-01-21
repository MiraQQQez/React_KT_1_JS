import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { selectAllTeachers } from '../store/teachersSlice'

function formatTeacherName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length < 2) return name

  const [surname, firstName, patronymic] = parts

  const firstInitial = firstName?.[0] ? `${firstName[0]}.` : ''
  const patronymicInitial = patronymic?.[0] ? `${patronymic[0]}.` : ''

  return `${surname} ${firstInitial}${patronymicInitial}`.trim()
}

export const TeachersList = () => {
  const teachers = useAppSelector(selectAllTeachers)

  const teachersToRender = teachers.map((teacher) => (
    <li key={teacher.id}>
      <Link to={`${teacher.id}`}>{formatTeacherName(teacher.name)}</Link> ({teacher.subject})
    </li>
  ))

  return (
    <section>
      <h2>Teachers</h2>
      <ul>{teachersToRender}</ul>
    </section>
  )
}
