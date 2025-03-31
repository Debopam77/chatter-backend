import {ConversationsDocument, ConversationsModel} from '../models/Conversations';
import mongoose from 'mongoose';

export const createConversation = async (userData: ConversationsDocument): Promise<ConversationsDocument|null> => {
    const conversations: ConversationsDocument[] = await ConversationsModel.find({
        type: 'private', 
        participants: { $all: [userData.participants[0], userData.participants[1]], $size: 2 } }).lean();
    if(conversations.length === 0) {
        // Existing record not found
        const conversation = new ConversationsModel(userData);
        return conversation.save();
    } else {
        return conversations[0];
    }
}

export const getConversationsByUserId = async(userId: string): Promise<ConversationsDocument[] | null> => {
    try {
        const conversations = await ConversationsModel.find({
            participants: { $in: [new mongoose.Types.ObjectId(userId)]}
        }).populate('participants').sort({updatedAt: -1});

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