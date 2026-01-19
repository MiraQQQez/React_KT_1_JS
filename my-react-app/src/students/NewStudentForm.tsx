import { useState, useEffect, type ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { studentAdded } from '../store/studentsSlice'

export const NewStudentForm = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState<number>(0)
  const [specialty, setSpecialty] = useState('')
  const [teacher, setTeacher] = useState('')
  const teachersList = useAppSelector((state) => state.teachers)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!teacher && teachersList.length > 0) {
      setTeacher(teachersList[0]?.name ?? '')
    }
  }, [teacher, teachersList])

  const onNameChanged = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const onSurnameChanged = (e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)
  const onAgeChanged = (e: ChangeEvent<HTMLInputElement>) => setAge(Number(e.target.value))
  const onSpecialtyChanged = (e: ChangeEvent<HTMLInputElement>) => setSpecialty(e.target.value)
  const onTeacherChanged = (e: ChangeEvent<HTMLSelectElement>) => setTeacher(e.target.value)

  const teachersOptions = teachersList.map((t) => (
    <option key={t.name} value={t.name}>
      {t.name}
    </option>
  ))

  const onSaveStudentClick = () => {
    if (name && surname && age && specialty && teacher) {
      dispatch(studentAdded(name, surname, age, specialty, teacher))

      setName('')
      setSurname('')
      setAge(0)
      setSpecialty('')
      setTeacher('')
    }
  }

  return (
    <div>
      <h2>Add a New Student</h2>
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
          <select id="studentTeacher" name="studentTeacher" value={teacher} onChange={onTeacherChanged}>
            {teachersOptions}
          </select>
        </p>
        <button type="button" onClick={onSaveStudentClick}>
          save
        </button>
      </form>
    </div>
  )
}
