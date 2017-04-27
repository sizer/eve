import * as mongoose from "mongoose";
import { Contact } from "../../../domain/entities/contact/Contact";
import { Message } from "../../../domain/entities/contact/Message";
import { User } from "../../../domain/entities/user/User";

const schema = new mongoose.Schema({
    message: {
        type: Message,
        required: true
    },
    user: {
        type: User,
        required: true
    }
});

export const ContactSchemaMongo = mongoose.model<Contact>('contact', schema, 'contacts', true);
