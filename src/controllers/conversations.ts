import {Request, Response} from 'express';
import * as conversationsService from '../services/conversations';
import {io} from '../index';

export const createConversation = async (req: Request, res: Response) => {
    try {
        // Magic should happen here, we need to emit the fact that a new message
        const conversation = await conversationsService.createConversation(req.body);
        if(conversation) {
            await conversation.populate('participants');
            conversation.participants.forEach((participant) => {
                console.log("Emiting new convo...");
                io.emit('newConversation', conversation);
            });
        }
        res.status(201).json(conversation);
    }catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const getConversationsByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.user_id;
        const conversations = await conversationsService.getConversationsByUserId(userId);
        res.status(201).json(conversations);
    }catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const getConversationById = async (req: Request, res: Response) => {
    try {
        const conversation = await conversationsService.getConversationById(req.params.id);
        res.status(201).json(conversation);
    }catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
export const deleteConversationById = async (req: Request, res: Response) => {
    try {
        const conversation = await conversationsService.deleteConversationById(req.params.id);
        res.status(201).json(conversation);
    }catch (error: any) {
        res.status(500).json({message: error.message});
    }
};