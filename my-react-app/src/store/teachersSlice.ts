import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../api/client'
import type { RootState } from './store'

export interface Teacher {
  id: string
  name: string
  subject: string
}

const initialState: Teacher[] = []

type FetchTeachersResponse = {
  teachers: Teacher[]
}

export const fetchTeachers = createAsyncThunk('teachers/fetchTeachers', async () => {
  const response = {
    data: await client.get<FetchTeachersResponse>('/fakeServer/teachers'),
  }

  return response.data
},
{
  condition: (_arg, { getState }) => {
    const state = getState() as RootState
    return state.teachers.length === 0
  },
})

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeachers.fulfilled, (_state, action) => {
      return action.payload.teachers
    })
  },
})

export default teachersSlice.reducer

export const selectAllTeachers = (state: RootState) => state.teachers

export const selectTeacherById = (state: RootState, teacherId: string | undefined) => {
  if (teacherId === undefined || teacherId === null) return undefined
  return state.teachers.find((t) => String(t.id) === String(teacherId))
}
