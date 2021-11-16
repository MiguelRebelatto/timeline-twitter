export class User {
  name: string
  username: string
  photo: string

  constructor(partial?: Partial<User>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
