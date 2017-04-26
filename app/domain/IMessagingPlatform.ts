export interface IMessagingPlatform {

    isSignatureValid(req: any): boolean;

    isTextMessage(event: any): boolean;

    sendTextMessage(message: string, replyToken: string): void;
}
