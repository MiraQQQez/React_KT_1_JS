# React_KT_1_JS

Проект для учебной работы. Основное приложение находится в папке `my-react-app` (React + Vite).

 Проект переведен на TypeScript (`.ts/.tsx`).

## Что сделано в проекте (кратко)

- **Redux Toolkit (studentsSlice)**
  - `initialState` хранит `{ students, status, error }`
  - добавлены селекторы `selectAllStudents`, `selectStudentById`
  - компоненты переведены на использование селекторов

- **MSW (Mock Service Worker)**
  - подключён в `my-react-app/src/main.tsx` (стартует только в dev-режиме)
  - воркер: `my-react-app/public/mockServiceWorker.js`
  - обработчики запросов описаны через массив `handlers` в `my-react-app/src/server.ts`

- **@mswjs/data (in-memory DB)**
  - база данных и сидирование: `my-react-app/src/mocks/db.ts`
  - связи:
    - `student.teacher -> teacher` (oneOf)
    - `vote.leader/captain -> student` (nullable(oneOf))
  - генераторы данных:
    - `my-react-app/src/mocks/createTeacherData.ts`
    - `my-react-app/src/mocks/createStudentData.ts`
  - сериализация студента для API: `serializeStudent` (поле `teacher` становится `teacher.id`)

- **API client (fetch wrapper)**
  - `my-react-app/src/api/client.ts`
  - методы: `client`, `client.get`, `client.post`
  - базовый префикс API: `/fakeServer`

## Эндпоинты мок-сервера

- `GET /fakeServer/students`
  - возвращает `{ students: [...] }`
  - список берётся из `db.student.getAll()` и сериализуется через `serializeStudent`

## Быстрый старт

```bash
cd my-react-app
npm install
npm run dev
```

 После запуска откройте адрес из консоли Vite (обычно `http://localhost:5173/`, но порт может отличаться, если занят).

## Скрипты

Запускать из папки `my-react-app`:

- `npm run dev` — режим разработки
- `npm run build` — сборка
- `npm run preview` — предпросмотр сборки
- `npm run lint` — проверка ESLint

## Важно про файлы .js и .ts

В уроках иногда фигурируют `server.js`, `db.js`, `client.js`.
В этом репозитории **рабочая версия сделана на TypeScript**:

- используется `my-react-app/src/server.ts`
- используется `my-react-app/src/mocks/db.ts`
- используется `my-react-app/src/api/client.ts`

Если рядом остались одноимённые `.js` файлы — это старые заготовки/шаги миграции и их можно удалить, чтобы не путаться.
