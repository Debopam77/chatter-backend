import {Request, Response} from 'express';
import * as messageService from '../services/messages';

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await messageService.getMessagesByConversationId(req.params.conversationId);
        res.status(201).json(messages);
    }catch(error: any) {
        res.status(500).json({message: error.message});
    }
}

export const createMessage = async(req: Request, res: Response) => {
    try {
        const message = await messageService.createMessage(req.body);
        res.status(200).json(message);
    }catch(error: any) {
        res.status(500).json({message: error.message});
    }
}

export const deleteMessage = async (req: Request, res: Response) => {
    await messageService.deleteMessages(req.params.id);
}