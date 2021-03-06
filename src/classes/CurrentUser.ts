interface UserProps {
  exp: number;
  course: { id: number, name: string };
  fullName: string;
  iat: number;
  id: number;
  role: string;
  username: string;
}

export default class CurrentUser {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get course(): { id: number, name: string } {
    return this.props.course;
  }

  get exp(): number {
    return this.props.exp;
  }

  get fullName(): string {
    return this.props.fullName;
  }

  get iat(): number {
    return this.props.iat;
  }

  get id(): number {
    return this.props.id;
  }

  get role(): string {
    return this.props.role;
  }

  get username(): string {
    return this.props.username;
  }
}
