class User {
  firstName: any;
  lastName: any;
  email: any;

  constructor();
  constructor(firstName: string, lastName: string, email: string);
  constructor(firstName?: string, lastName?: string, email?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

export default User;