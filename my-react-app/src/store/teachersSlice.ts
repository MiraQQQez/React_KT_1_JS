import { createSlice } from '@reduxjs/toolkit'

export interface Teacher {
  name: string
  subject: string
}

const initialState: Teacher[] = [
  { name: 'Преподаватель 1', subject: 'Математика' },
  { name: 'Преподаватель 2', subject: 'Программирование' },
  { name: 'Преподаватель 3', subject: 'Английский язык' },
]

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
})

export default teachersSlice.reducer
