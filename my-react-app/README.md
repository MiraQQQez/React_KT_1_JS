# Приложение "Студенты" (React + Vite + TypeScript)

Учебное приложение для работы со списком студентов и мок-сервером.

Подробности по структуре проекта и выполненным шагам смотри в корневом `README.md`.

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

## Мок-сервер (MSW)

MSW стартует только в dev-режиме и перехватывает запросы в браузере.

- worker: `public/mockServiceWorker.js`
- конфигурация: `src/server.ts`
- in-memory DB: `src/mocks/db.ts`

Эндпоинты:

- `GET /fakeServer/students` → `{ students: [...] }`
- `POST /fakeServer/students` → `{ student: {...} }`
- `GET /fakeServer/teachers` → `{ teachers: [...] }`
