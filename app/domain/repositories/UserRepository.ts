import { User } from "../entities/user/User";
import { Readable } from "./Readable";
import { Writable } from "./Writable";

export interface UserRepository extends Readable<User>, Writable<User> {
  findByUsername(name: string): Promise<User[]>
}
