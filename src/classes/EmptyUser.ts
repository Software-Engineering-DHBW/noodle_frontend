export default class EmptyUser {
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
    this.role = '';
    this.fullname = '';
    this.matriculationNumber = null;
    this.address = '';
    this.mail = '';
  }
}
