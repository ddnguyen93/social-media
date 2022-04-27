import { Request } from 'express';
export interface UserAuthInfoRequest extends Request {
	userData?: string;
}
