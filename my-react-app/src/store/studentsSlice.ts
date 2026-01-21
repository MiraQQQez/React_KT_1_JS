import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'
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
  teacher: string
  votes: StudentVotes
}

export type StudentUpdate = Omit<Student, 'votes'>

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

// Слайс students: хранит массив студентов
const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    studentAdded: {
      reducer(state, action: PayloadAction<Student>) {
        state.students.push(action.payload)
      },
      prepare(name: string, surname: string, age: number, specialty: string, teacher: string) {
        return {
          payload: {
            id: nanoid(),
            name,
            surname,
            age,
            specialty,
            teacher,
            votes: { GL: 0, TC: 0 },
          } satisfies Student,
        }
      },
    },
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
})

export const { studentAdded, studentUpdated, voteClicked } = studentsSlice.actions
export default studentsSlice.reducer

export const selectAllStudents = (state: RootState) => state.students.students

export const selectStudentById = (state: RootState, studentId: StudentId | undefined) => {
  if (studentId === undefined || studentId === null) return undefined
  return state.students.students.find((s) => String(s.id) === String(studentId))
}
