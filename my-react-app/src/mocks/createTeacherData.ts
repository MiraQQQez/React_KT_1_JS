export type TeacherData = {
  id: string
  name: string
  subject: string
}

const subjects = ['Математика', 'Программирование', 'Английский язык', 'Физика', 'История']

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T
}

// Создаёт объект преподавателя. Если subject не передан — выбирается случайно.
export function createTeacherData(name: string, subject?: string): TeacherData {
  return {
    id: name,
    name,
    subject: subject ?? pickRandom(subjects),
  }
}
