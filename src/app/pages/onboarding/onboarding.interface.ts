export interface NickNameExistanceResponseIntreface {
    status: boolean;
}

export interface UserLogStatusResponseIntreface {
    status: boolean;
}

export interface TokenInfoInterface {
    accessToken: string;
    refreshToken: string;
}

export interface UserInfoInterface {
    _id?: string;
    id: string;
    firstname: string;
	lastname: string;
	nickname: string;
	age: number;
	gender: string;
	password?: string;
    avatarUrl?: string;
    isLoggedIn: boolean; 
    lastLogggedInAt: string;
    lastLogggedOutAt: string;
    tokens?: TokenInfoInterface;
}

export interface SignUpPayloadInterface {
    firstname: string;
	lastname: string;
	nickname: string;
	age: number;
	gender: string;
    password: string;
}

export interface SignInPayloadInterface {
    nickname: string;
    password: string;
}

export interface SignUpResponseInterface {
    userInfo: UserInfoInterface;
}

export interface SignInResponseInterface {
    userInfo: UserInfoInterface;
}