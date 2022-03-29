import axios from 'axios';
import { NewCalendarEntry } from '@/classes/NewCalendarEntry';
import { CalendarEntry } from '@/classes/CalendarEntry';

class CalendarService {
  static getPersonalCalendar(): Promise<Array<CalendarEntry>> {
    return axios
      .get('api/timetable/getPerson')
      .then((res) => res.data);
  }

  static registerEntry(entry: NewCalendarEntry): Promise<void> {
    return axios.post('api/timetable/insert', entry);
  }
}

export default CalendarService;
