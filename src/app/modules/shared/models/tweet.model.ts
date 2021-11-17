import { User } from "./user.model";

export class Tweet {
  id: string
  user: User
  text: string
  image?: string
  createdAt: Date

  constructor(partial?: Partial<Tweet>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
