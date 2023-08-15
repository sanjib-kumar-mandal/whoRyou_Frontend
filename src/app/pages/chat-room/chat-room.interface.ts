export interface MessageInterface {
    id: string;
    message: string;
    type: MessageTypeEnum;
    time: string;
}

export enum MessageTypeEnum {
    FROM_USER = 1,
    FROM_SENDER = 2
}