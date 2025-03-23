import { Request, Response, NextFunction } from 'express';
import { UserDocument } from '../models/User';

interface AuthenticatedRequest extends Request {
    user?: UserDocument|any;
}

export const authenticator = async (req: AuthenticatedRequest, res: Response, next: NextFunction) =>{
    try {
        next();
    } catch(error) {
        console.error('Error while authenticating:', error);
    }
};