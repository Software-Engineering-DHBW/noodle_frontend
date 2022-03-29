export type Course = {
  id: number,
  name: string,
  students: Array<{ id: number, userDetail: never }>,
  assignedModules: Array<unknown>
}
