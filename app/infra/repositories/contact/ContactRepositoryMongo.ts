import { Contact } from "../../../domain/entities/contact/Contact";
import { ContactRepository } from "../../../domain/repositories/contact/ContactRepository";
import { RepositoryMongoBase } from "../RepositoryMongoBase";

export class ContactRepositoryMongo extends RepositoryMongoBase<Contact> implements ContactRepository {
    constructor() {
        super("contact");
    }
}
