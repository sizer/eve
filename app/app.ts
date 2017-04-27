import { BotApplication } from "./application/BotApplication";

//new BotApplication().boot();

import * as mongoose from "mongoose";
import { Contact } from "./domain/entities/contact/Contact";
import { ContactModel } from "./domain/model/ContactModel";
let uri = 'mongodb://localhost/heroes';
mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err.message);
        console.log(err);
    }
    else {
        console.log('Connected to MongoDb');
    }
});

ContactModel.createContact({ text: "hello" }, { name: { nickname: "mah" } }).then((res) => {
    console.log('### Created Contact ###');
    console.log(res);

    ContactModel.findContact('mah').then((res) => {
        console.log('### Found Contact ###');
        console.log(res);

        // now update the Hero
        const contact = <Contact>res;
        contact.message = { text: 'one more time.' };
        contact.save((err, res) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            }
            else {
                console.log(res);
            }
        });
    }, (err) => {
        if (err) {
            console.log(err.message);
        }
    });
}, (err) => {
    if (err) {
        console.log(err.message);
        console.log(err);
    }
});
