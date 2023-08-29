export interface ConversationInfoInterface {
	_id: string;
	participants: Array<{
        id: string;
        nickname: string;
    }>;	
    lastMessageInfo: LastMessageInfoInterface;
	createdAt: string;
	updatedAt: string;

}

export interface LastMessageInfoInterface {
	_id: string;
	message: string;
	time: string;
	status: MessageStatusEnum;
}

export enum MessageStatusEnum {
    READ = 'read', // Receiver has read the message
    NOT_READ = 'not_read', // Receiver has not read the message
    DELIVERED = 'delivered', // The message has been delivered to the receiver
    NOT_DELIVERED = 'not_delivered', // The message has not been delivered to the receiver
    SEEN = 'seen', // User has seen the message
    NOT_SEEN = 'not_seen', // User has not seen the message
}

export interface ChatItemInfoInterface {
    id: string; 
    nickName: string;
    avatarUrl: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadMessageCount: number;
    messageStatus: MessageStatusEnum;
} 
