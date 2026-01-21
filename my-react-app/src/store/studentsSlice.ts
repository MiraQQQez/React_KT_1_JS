import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { client } from '../api/client'
import type { RootState } from './store'

export type StudentId = string | number
export type VoteCode = 'GL' | 'TC'

export interface StudentVotes {
  GL: number
  TC: number
}

export interface Student {
  id: StudentId
  name: string
  surname: string
  age: number
  specialty: string
  teacher: string | undefined
  votes: StudentVotes
}

export type StudentUpdate = Omit<Student, 'votes'>

export type NewStudent = {
  name: string
  surname: string
  age: number
  specialty: string
  teacher: string
}

export interface StudentsState {
  students: Student[]
  status: string
  error: string | null
}

// Начальное состояние слайса: список студентов
const initialState: StudentsState = {
  students: [
    {
      id: 1,
      name: 'Игорь',
      surname: 'Иванов',
      age: 20,
      specialty: 'Frontend-разработка',
      teacher: 'Преподаватель 1',
      votes: { GL: 0, TC: 0 },
    },
    {
      id: 2,
      name: 'Анна',
      surname: 'Петрова',
      age: 21,
      specialty: 'Backend-разработка',
      teacher: 'Преподаватель 2',
      votes: { GL: 0, TC: 0 },
    },
  ],
  status: 'idle',
  error: null,
}

type FetchStudentsResponse = {
  students: Student[]
}

type AddStudentResponse = {
  student: Student
}

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    const response = {
      data: await client.get<FetchStudentsResponse>('/fakeServer/students'),
    }

    return response.data
  },
  {
    condition: (_arg, { getState }) => {
      const state = getState() as RootState
      return state.students.status === 'idle'
    },
  },
)

export const addStudent = createAsyncThunk('students/addStudent', async (newStudent: NewStudent) => {
  const response = {
    data: await client.post<AddStudentResponse>('/fakeServer/students', newStudent),
  }

  return response.data
})

// Слайс students: хранит массив студентов
const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    studentUpdated(state, action: PayloadAction<StudentUpdate>) {
      const { id, name, surname, age, specialty, teacher } = action.payload

      const existingStudent = state.students.find((student) => String(student.id) === String(id))
      if (existingStudent) {
        existingStudent.name = name
        existingStudent.surname = surname
        existingStudent.age = age
        existingStudent.specialty = specialty
        existingStudent.teacher = teacher
      }
    },
    voteClicked(state, action: PayloadAction<{ studentId: StudentId; vote: VoteCode }>) {
      const { studentId, vote } = action.payload

      const existingStudent = state.students.find((student) => String(student.id) === String(studentId))
      if (existingStudent) {
        existingStudent.votes[vote] += 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.students = action.payload.students
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown error'
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload.student)
      })
  },
})

export const { studentUpdated, voteClicked } = studentsSlice.actions
export default studentsSlice.reducer

export const selectAllStudents = (state: RootState) => state.students.students

export const selectStudentById = (state: RootState, studentId: StudentId | undefined) => {
  if (studentId === undefined || studentId === null) return undefined
  return state.students.students.find((s) => String(s.id) === String(studentId))
}
