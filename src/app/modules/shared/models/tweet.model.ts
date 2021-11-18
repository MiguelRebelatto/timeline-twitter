import { User } from "./user.model";

export class Tweet {
  id: string
  user: User
  text: string
  createdAt: Date
  image?: string
  animate?: string

  constructor(partial?: Partial<Tweet>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
