import { Contact } from "../entities/contact/Contact";
import { Readable } from "./Readable";
import { Writable } from "./Writable";

export interface ContactRepository extends Readable<Contact>, Writable<Contact> {
}
