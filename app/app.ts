import { BotApplication } from "./application/BotApplication";
import { ContactRepositoryMongo } from "./infra/repositories/ContactRepositoryMongo";
import { Contact } from "./domain/entities/contact/Contact";

//new BotApplication().boot();
const repo = new ContactRepositoryMongo();
const contact = <Contact>{
    message: { text: "hoge" }
}
console.log("app.ts: insert entity " + JSON.stringify(contact));
repo.insert(contact)
    .then((e) => {
        console.log("app.ts:insert result is " + e);
        repo.findById(e.id)
            .then((result) => {
                console.log(JSON.stringify(result));
            })
    }).catch((e) => {
        console.log(e);
    });
