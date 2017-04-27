import { Message } from "./Message";
import { Entity } from "../Entity";

export interface Contact extends Entity {
    message: Message
}
