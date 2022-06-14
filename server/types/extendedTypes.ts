import { Request } from 'express';
interface UserDataType {
	userID: string;
	username: string;
}

export interface UserAuthInfoRequest extends Request {
	userData?: UserDataType;
}
