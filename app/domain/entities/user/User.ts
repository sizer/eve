import { UserName } from "./UserName";
import { Entity } from "../Entity";

export interface User extends Entity {
    name: UserName
}
