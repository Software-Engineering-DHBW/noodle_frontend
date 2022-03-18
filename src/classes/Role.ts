import store from '@/store';

class Role {
  Admin = 'administrator';

  Teacher = 'teacher';

  Student = 'student';

  isStudent() {
    return store.getters['Auth/currentUser'].role === this.Student;
  }

  isTeacher() {
    return store.getters['Auth/currentUser'].role === this.Teacher;
  }

  isAdmin() {
    return store.getters['Auth/currentUser'].role === this.Admin;
  }
}

export default new Role();
