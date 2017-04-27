import { Contact } from "../entities/contact/Contact";
import { Message } from "../entities/contact/Message";
import { User } from "../entities/user/User";
import { ContactRepositoryMongo } from "../../infra/repositories/contact/ContactRepositoryMongo";

export class ContactModel {

    private _contactModel: Contact;

    constructor(contactModel: Contact) {
        this._contactModel = contactModel;
    }
    get message(): Message {
        return this._contactModel.message;
    }

    get user(): User {
        return this._contactModel.user;
    }

    static createContact(message: Message, user: User): Promise.IThenable<Contact> {
        return new Promise((resolve, reject) => {
            const contact = <Contact>{ message, user };
            new ContactRepositoryMongo()
                .create(contact, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    }

    static findContact(name: string): Promise.IThenable<Contact> {
        return new Promise((resolve, reject) => {
            new ContactRepositoryMongo()
                .find({ name: { nickname: name } })
                .limit(1)
                .exec((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (res.length) {
                            resolve(res[0]);
                        } else {
                            resolve(null);
                        }
                    }
                });
        });
    }

}
