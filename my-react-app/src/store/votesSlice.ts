import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { StudentId } from './studentsSlice'

export interface VotesState {
  // Id выбранного старосты группы
  leaderId: StudentId | null
  // Id выбранного капитана спортивной команды
  captainId: StudentId | null
}

const initialState: VotesState = {
  leaderId: null,
  captainId: null,
}

const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {
    leaderSelected(state, action: PayloadAction<StudentId>) {
      state.leaderId = action.payload
    },
    captainSelected(state, action: PayloadAction<StudentId>) {
      state.captainId = action.payload
    },
  },
})

export const { leaderSelected, captainSelected } = votesSlice.actions
export default votesSlice.reducer
