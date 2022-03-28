import axios from 'axios';
import { NoodleModule } from '@/classes/NoodleModule';
import { CalendarEntry } from '@/classes/CalendarEntry';

class CalendarService {
  static getPersonalCalendar(): Promise<Array<NoodleModule>> {
    return axios
      .get('api/timetable/getPerson')
      .then((res) => res.data);
  }

  static registerEntry(entry: CalendarEntry): Promise<void> {
    return axios.post('api/timetable/insert', entry);
  }
}

export default CalendarService;
