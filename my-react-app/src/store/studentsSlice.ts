import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

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

// Начальное состояние слайса: список студентов
const initialState: Student[] = [
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
]

// Слайс students: хранит массив студентов
const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    studentAdded: {
      reducer(state, action: PayloadAction<Student>) {
        state.push(action.payload)
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

      const existingStudent = state.find((student) => String(student.id) === String(id))
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

      const existingStudent = state.find((student) => String(student.id) === String(studentId))
      if (existingStudent) {
        existingStudent.votes[vote] += 1
      }
    },
  },
})

export const { studentAdded, studentUpdated, voteClicked } = studentsSlice.actions
export default studentsSlice.reducer
