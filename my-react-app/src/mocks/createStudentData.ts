export type StudentVotesData = {
  GL: number
  TC: number
}

export type StudentData<TTeacher> = {
  id: string
  name: string
  surname: string
  age: number
  specialty: string
  teacher: TTeacher
  votes: StudentVotesData
}

const specialties = ['Frontend-разработка', 'Backend-разработка', 'Fullstack-разработка', 'UI/UX дизайн']

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T
}

function createId(): string {
  const uuid = globalThis.crypto?.randomUUID?.()
  return uuid ?? String(Date.now())
}

// Создаёт объект студента. teacher передаётся как сущность преподавателя (для связи oneOf('teacher')).
export function createStudentData<TTeacher>(params: {
  id?: string
  name: string
  surname: string
  teacher: TTeacher
  age?: number
  specialty?: string
  votes?: StudentVotesData
}): StudentData<TTeacher> {
  return {
    id: params.id ?? createId(),
    name: params.name,
    surname: params.surname,
    age: params.age ?? Math.floor(Math.random() * 10) + 18,
    specialty: params.specialty ?? pickRandom(specialties),
    teacher: params.teacher,
    votes: params.votes ?? { GL: 0, TC: 0 },
  }
}
