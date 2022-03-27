import axios from 'axios';
import { NewModule } from '@/classes/NewModule';
import { NoodleModule } from '@/classes/NoodleModule';

class ModuleService {
  static getAllModules(): Promise<Array<NoodleModule>> {
    return axios
      .get('api/module/getAllModules')
      .then((res) => res.data);
  }

  static registerModule(module: NewModule): Promise<void> {
    return axios
      .post('api/module/register', module);
  }
}

export default ModuleService;
