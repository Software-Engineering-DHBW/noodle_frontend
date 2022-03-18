export default class EmptyUser {
  username: string;

  password: string;

  matriculationNumber: number | null;

  role: string;

  address: {
    fullName: string,
    street: string,
    postalCode: number | null,
  };

  email: string;

  constructor() {
    this.username = '';
    this.password = '';
    this.matriculationNumber = null;
    this.role = '';
    this.address = {
      fullName: '',
      street: '',
      postalCode: null,
    };
    this.email = '';
  }
}
