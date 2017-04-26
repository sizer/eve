import * as crypto from "crypto";
import * as request from "request";
import { IMessagingPlatform } from "../domain/IMessagingPlatform";

export class MessagingPlatformLINE implements IMessagingPlatform {

    private static LINE_MESSAGE_API_URL_BASE: string = "https://api.line.me/v2/bot/message";
    private channelSecret: string;
    private channelAccessToken: string;
    constructor(channelSecret: string, channelAccessToken: string) {
        this.channelSecret = channelSecret;
        this.channelAccessToken = channelAccessToken;
    }

    public isSignatureValid(req: any): boolean {
        return req.headers["X-Line-Signature"]
            === crypto.createHmac("SHA256", this.channelSecret)
                .update(Buffer.from(JSON.stringify(req.body)))
                .digest("base64");
    }

    public isTextMessage(event: any): boolean {
        return event.type === "message"
            && event.message.type === "text";
    }

    public sendTextMessage(message: string, replyToken: string): void {
        const options = {
            body: {
                messages: [{
                    text: message,
                    type: "text",
                }],
                replyToken,
            },
            headers: {
                "Authorization": "Bearer " + this.channelAccessToken,
                "Content-Type": "application/json; charset=UTF-8",
            },
            json: true,
            url: MessagingPlatformLINE.LINE_MESSAGE_API_URL_BASE + "/reply",
        };
        request.post(options);
    }
}
