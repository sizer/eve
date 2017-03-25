import * as bodyParser from "body-parser";
import * as express from "express";
import * as request from "request";
import { LineMessagingApi } from "./infra/LineMessageingApi";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "this is eve-linebot." });
});

const lineApi = new LineMessagingApi(
    process.env.LINE_CHANNEL_SECRET,
    process.env.LINE_CHANNEL_ACCESS_TOKEN,
);

app.post("/callback", (req, res) => {
    if (!lineApi.isSignatureValid(req)) { res.status(403).send("invalid signature"); }
    const body: any = req.body;
    if (lineApi.isTextMessage(body.events[0])) {
        lineApi.sendTextMessage(body.events[0].message.text);
    } else {
        lineApi.sendTextMessage("ごめんなさい、わかりませんでした。");
    }
});

app.listen(process.env.PORT || 3000);

module.exports = app;
