import { configureStore } from '@reduxjs/toolkit'
import studentsReducer from './studentsSlice.js'

// Глобальный Redux Store приложения
const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
})

export default store
