import { MessageStatusEnum } from "../chats/chats.interface";

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

export interface ChatInfoInterface {
    _id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    message: string;
    time: string;
    status: MessageStatusEnum;
}