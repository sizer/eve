import * as bodyParser from "body-parser";
import * as express from "express";
import * as request from "request";
import { MessagingPlatformLINE } from "../infra/MessagingPlatformLINE";

export class BotApplication {

    public boot() {
        const app = express();

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        app.get("/", (req, res) => {
            res.status(200).json({ message: "this is eve-linebot." });
        });

        const lineApi = new MessagingPlatformLINE(
            process.env.LINE_CHANNEL_SECRET,
            process.env.LINE_CHANNEL_ACCESS_TOKEN,
        );

        app.post("/callback", (req, res) => {
            if (!lineApi.isSignatureValid(req)) { res.status(403).send("invalid signature"); }
            const body: any = req.body;
            const firstEvent: any = body.events[0];
            if (lineApi.isTextMessage(firstEvent)) {
                lineApi.sendTextMessage(firstEvent.message.text, firstEvent.replyToken);
            } else {
                lineApi.sendTextMessage("ごめんなさい、メッセージが理解できませんでした。", firstEvent.replyToken);
            }
        });

        app.listen(process.env.PORT || 3000);

        module.exports = app;
    }
}
