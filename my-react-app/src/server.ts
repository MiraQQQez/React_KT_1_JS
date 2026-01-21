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
)

export const worker = setupWorker(...handlers)
