import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { db, serializeStudent } from './mocks/db'

// Воркер MSW (Mock Service Worker) для перехвата сетевых запросов в браузере.
const handlers: Parameters<typeof setupWorker> = []

handlers.push(
  http.get('/fakeServer/students', () => {
    const students = db.student.getAll().map(serializeStudent)
    return HttpResponse.json({ students })
  }),
  http.post('/fakeServer/students', async ({ request }) => {
    let data: unknown

    try {
      data = await request.json()
    } catch {
      return HttpResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (typeof data !== 'object' || data === null) {
      return HttpResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const payload = data as Record<string, unknown>

    const name = payload['name']
    const surname = payload['surname']
    const age = payload['age']
    const specialty = payload['specialty']
    const teacherId = payload['teacher']

    if (
      typeof name !== 'string' ||
      typeof surname !== 'string' ||
      typeof age !== 'number' ||
      typeof specialty !== 'string' ||
      typeof teacherId !== 'string'
    ) {
      return HttpResponse.json({ error: 'Invalid student data' }, { status: 400 })
    }

    const teacher = db.teacher.getAll().find((t) => t.id === teacherId)
    if (!teacher) {
      return HttpResponse.json({ error: 'Teacher not found' }, { status: 404 })
    }

    const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now())

    const student = db.student.create({
      id,
      name,
      surname,
      age,
      specialty,
      teacher,
      votes: { GL: 0, TC: 0 },
    })

    return HttpResponse.json({ student: serializeStudent(student) }, { status: 201 })
  }),
  http.get('/fakeServer/teachers', () => {
    const teachers = db.teacher.getAll()
    return HttpResponse.json({ teachers })
  }),
)

export const worker = setupWorker(...handlers)
