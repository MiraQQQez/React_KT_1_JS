import { useSelector } from 'react-redux'

export const StudentsList = () => {
  const students = useSelector((state) => state.students)

  const dispStudents = students.map((student) => (
    <div key={student.id}>
      <h3>
        {student.name} {student.surname}
      </h3>
      <p>Id: {student.id}</p>
      <p>Возраст: {student.age}</p>
      <p>Специальность: {student.specialty}</p>
    </div>
  ))

  return (
    <div>
      <h2>Students</h2>
      {dispStudents}
    </div>
  )
}
