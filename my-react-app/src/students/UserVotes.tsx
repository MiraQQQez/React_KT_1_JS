import { useAppDispatch, useAppSelector } from '../store/hooks'
import { voteClicked } from '../store/studentsSlice'

// Обозначения кнопок для голосования
export const votesObj = {
  leader: 'GL',
  captain: 'TC',
} as const

type UserVotesProps = {
  studentId: string | number
}

export const UserVotes = ({ studentId }: UserVotesProps) => {
  const dispatch = useAppDispatch()

  const student = useAppSelector((state) =>
    state.students.students.find((s) => String(s.id) === String(studentId)),
  )

  if (!student) return null

  return (
    <div>
      <button
        type="button"
        onClick={() => dispatch(voteClicked({ studentId: student.id, vote: votesObj.leader }))}
      >
        {votesObj.leader}
      </button>
      <button
        type="button"
        onClick={() => dispatch(voteClicked({ studentId: student.id, vote: votesObj.captain }))}
      >
        {votesObj.captain}
      </button>
      <span>
        {' '}
        GL: {student.votes.GL} | TC: {student.votes.TC}
      </span>
    </div>
  )
}
