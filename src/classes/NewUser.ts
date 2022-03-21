import Role from '@/classes/Role';

export default class NewUser {
  username: string;

  password: string;

  role: string;

  fullname: string;

  address: string;

  matriculationNumber: number | null;

  mail: string;

  constructor() {
    this.username = '';
    this.password = '';
    this.role = Role.STUDENT;
    this.fullname = '';
    this.matriculationNumber = null;
    this.address = '';
    this.mail = '';
  }
}
