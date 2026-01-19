import { configureStore } from '@reduxjs/toolkit'
import studentsReducer from './studentsSlice'
import teachersReducer from './teachersSlice'
import votesReducer from './votesSlice'

// Глобальный Redux Store приложения
const store = configureStore({
  reducer: {
    students: studentsReducer,
    teachers: teachersReducer,
    votes: votesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
