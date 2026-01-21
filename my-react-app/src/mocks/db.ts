import { factory, nullable, oneOf, primaryKey } from '@mswjs/data'
import { createTeacherData } from './createTeacherData'
import { createStudentData } from './createStudentData'

// In-memory база данных для MSW
export const db = factory({
  student: {
    id: primaryKey(String),
    name: String,
    surname: String,
    age: Number,
    specialty: String,
    // Связь: студент закреплён за преподавателем
    teacher: oneOf('teacher'),
    votes: {
      GL: Number,
      TC: Number,
    },
  },
  teacher: {
    id: primaryKey(String),
    name: String,
    subject: String,
  },
  vote: {
    id: primaryKey(String),
    // Связь: выбранный староста группы
    leader: nullable(oneOf('student')),
    // Связь: выбранный капитан команды
    captain: nullable(oneOf('student')),
  },
})

export type StudentModel = ReturnType<(typeof db)['student']['getAll']>[number]

export type SerializedStudent = {
  id: string
  name: string
  surname: string
  age: number
  specialty: string
  teacher: string | undefined
  votes: {
    GL: number
    TC: number
  }
}

// Начальные данные
for (let i = 1; i <= 3; i += 1) {
  const teacher = db.teacher.create(createTeacherData(`Преподаватель ${i}`))

  for (let j = 1; j <= 3; j += 1) {
    db.student.create(
      createStudentData({
        id: `${i}-${j}`,
        name: `Студент ${i}-${j}`,
        surname: `Фамилия ${i}-${j}`,
        teacher,
        votes: { GL: 0, TC: 0 },
      }),
    )
  }
}

export function serializeStudent(student: StudentModel): SerializedStudent {
  return {
    id: student.id,
    name: student.name,
    surname: student.surname,
    age: student.age,
    specialty: student.specialty,
    teacher: student.teacher?.id,
    votes: {
      GL: student.votes?.GL ?? 0,
      TC: student.votes?.TC ?? 0,
    },
  }
}

// Один объект голосования (как состояние votesSlice)
db.vote.create({ id: 'main', leader: null, captain: null })
