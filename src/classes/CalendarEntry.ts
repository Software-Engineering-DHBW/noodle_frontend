import { NoodleModule } from './NoodleModule';

export type CalendarEntry = {
    id?: number
    startTime: string
    endTime: string
    description: string
    room: string
    assignedModule: NoodleModule | number
}
