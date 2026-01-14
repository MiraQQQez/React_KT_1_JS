import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { studentAdded } from '../store/studentsSlice.js'

export const NewStudentForm = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState(0)
  const [specialty, setSpecialty] = useState('')
  const dispatch = useDispatch()

  const onNameChanged = (e) => setName(e.target.value)
  const onSurnameChanged = (e) => setSurname(e.target.value)
  const onAgeChanged = (e) => setAge(e.target.value)
  const onSpecialtyChanged = (e) => setSpecialty(e.target.value)

  const onSaveStudentClick = () => {
    if (name && surname && age && specialty) {
      dispatch(
        studentAdded({
          id: nanoid(),
          name,
          surname,
          age,
          specialty,
        }),
      )

      setName('')
      setSurname('')
      setAge(0)
      setSpecialty('')
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
        <button type="button" onClick={onSaveStudentClick}>save</button>
      </form>
    </div>
  )
}
