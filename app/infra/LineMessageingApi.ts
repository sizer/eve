import * as crypto from "crypto";
import * as request from "request";

export class LineMessagingApi {

    private channelSecret: string;
    private channelAccessToken: string;
    constructor(channelSecret: string, channelAccessToken: string) {
        this.channelSecret = channelSecret;
        this.channelAccessToken = channelAccessToken;
    }

    public isSignatureValid(req: any): boolean {
        return req.headers["X-Line-Signature"]
            === crypto.createHmac("SHA256", this.channelSecret).update(req.body).digest("base64");
    }

    public isTextMessage(event: any): boolean {
        return event.type === "message"
            && event.message.type === "text";
    }

    public sendTextMessage(message: string): void {
        const options = {
            body: {},
            headers: {
                "Authorization": "Bearer " + this.channelAccessToken,
                "Content-Type": "application/json; charset=UTF-8",
            },
            json: true,
            url: "https://trialbot-api.line.me/v1/events",
        };
        request.post(options);
    }
}
