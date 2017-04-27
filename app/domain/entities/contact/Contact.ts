import { User } from "../user/User";
import { Message } from "./Message";
import * as mongoose from "mongoose";

export interface Contact extends mongoose.Document{
    message: Message;
    user: User;
}
