import {ConversationsDocument, ConversationsModel} from '../models/Conversations';
import mongoose from 'mongoose';

export const createConversation = async (userData: ConversationsDocument): Promise<ConversationsDocument> => {
    const user = new ConversationsModel(userData);
    return user.save();
}

export const getConversationsByUserId = async(userId: string): Promise<ConversationsDocument[] | null> => {
    try {
        const conversations = await ConversationsModel.find({
            participants: { $in: [new mongoose.Types.ObjectId(userId)]}
        }).populate('participants');

        return conversations;
    } catch(error) {
        throw error;
    }
}

export const deleteConversationById = async(conversationId: string):  Promise<ConversationsDocument | null> => {
    try {
        const deletedConversation = await ConversationsModel.findByIdAndDelete(conversationId).exec();
        return deletedConversation;
    } catch(error) {
        throw error;
    }
}

export const getConversationById = async(conversationId: string): Promise<ConversationsDocument|null> => {
    try {
        const conversation = await ConversationsModel.findById(conversationId).exec();
        return conversation;
    } catch(error) {
        throw error;
    }
}