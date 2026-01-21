import { useEffect, useState, type ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectStudentById, studentUpdated } from '../store/studentsSlice'

export const EditStudentForm = () => {
  const { studentId } = useParams()
  const dispatch = useAppDispatch()

  // Получаем текущего студента из store по id из URL
  const student = useAppSelector((state) => selectStudentById(state, studentId))

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState<number>(0)
  const [specialty, setSpecialty] = useState('')
  const [teacher, setTeacher] = useState('')

  // При открытии страницы подставляем текущие значения студента в форму
  useEffect(() => {
    if (!student) return

    setName(student.name ?? '')
    setSurname(student.surname ?? '')
    setAge(student.age ?? 0)
    setSpecialty(student.specialty ?? '')
    setTeacher(student.teacher ?? '')
  }, [student])

  const onNameChanged = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const onSurnameChanged = (e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)
  const onAgeChanged = (e: ChangeEvent<HTMLInputElement>) => setAge(Number(e.target.value))
  const onSpecialtyChanged = (e: ChangeEvent<HTMLInputElement>) => setSpecialty(e.target.value)
  const onTeacherChanged = (e: ChangeEvent<HTMLInputElement>) => setTeacher(e.target.value)

  const onSaveStudentClick = () => {
    if (!studentId) return

    if (name && surname && age && specialty && teacher) {
      dispatch(
        studentUpdated({
          id: studentId,
          name,
          surname,
          age,
          specialty,
          teacher,
        }),
      )
    }
  }

  if (!student) {
    return (
      <div>
        <h2>Студент не найден</h2>
        <p>Id: {studentId}</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Edit Student</h2>
      <form>
        <p>
          <label htmlFor="studentName">Name:</label>
          <input
            id="studentName"
            name="studentName"
            value={name}
            onChange={onNameChanged}
          />
        </p>
        <p>
          <label htmlFor="studentSurname">Surname:</label>
          <input
            id="studentSurname"
            name="studentSurname"
            value={surname}
            onChange={onSurnameChanged}
          />
        </p>
        <p>
          <label htmlFor="studentAge">Age:</label>
          <input
            id="studentAge"
            name="studentAge"
            value={age}
            onChange={onAgeChanged}
          />
        </p>
        <p>
          <label htmlFor="studentSpecialty">Specialty:</label>
          <input
            id="studentSpecialty"
            name="studentSpecialty"
            value={specialty}
            onChange={onSpecialtyChanged}
          />
        </p>
        <p>
          <label htmlFor="studentTeacher">Teacher:</label>
          <input
            id="studentTeacher"
            name="studentTeacher"
            value={teacher}
            onChange={onTeacherChanged}
          />
        </p>
        <button type="button" onClick={onSaveStudentClick}>
          save
        </button>
      </form>
    </div>
  )
}
