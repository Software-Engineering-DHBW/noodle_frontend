import { Course } from '@/classes/Course';

export type UserId = {
  id: number
  username: string
  isTeacher: boolean
  isAdministrator: boolean
  course: Course
}
