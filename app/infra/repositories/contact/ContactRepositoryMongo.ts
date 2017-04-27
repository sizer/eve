import { Contact } from "../../../domain/entities/contact/Contact";
import { ContactSchemaMongo } from "./ContactSchemaMongo"
import { RepositoryBase } from "../RepositoryBase";

export class ContactRepositoryMongo extends RepositoryBase<Contact> {
    constructor() {
        super(ContactSchemaMongo);
    }
}
