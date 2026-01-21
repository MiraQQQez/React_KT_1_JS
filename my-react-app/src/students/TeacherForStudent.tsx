import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

type TeacherForStudentProps = {
  studentId: string | number
}

export const TeacherForStudent = ({ studentId }: TeacherForStudentProps) => {
  const teacherLabel = useSelector((state: RootState) => {
    const student = state.students.students.find((s) => String(s.id) === String(studentId))
    if (!student) return 'anonym'

    const teacher = state.teachers.find((t) => t.name === student.teacher)
    if (!teacher) return 'anonym'

    return `${teacher.name} (${teacher.subject})`
  })

  return <span>{teacherLabel}</span>
}
