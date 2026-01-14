import { createSlice } from '@reduxjs/toolkit'

// Начальное состояние слайса: список студентов
const initialState = [
  {
    id: 1,
    name: 'Игорь',
    surname: 'Иванов',
    age: 20,
    specialty: 'Frontend-разработка',
  },
  {
    id: 2,
    name: 'Анна',
    surname: 'Петрова',
    age: 21,
    specialty: 'Backend-разработка',
  },
]

// Слайс students: хранит массив студентов
const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    studentAdded(state, action) {
      state.push(action.payload)
    },
  },
})

export const { studentAdded } = studentsSlice.actions
export default studentsSlice.reducer
