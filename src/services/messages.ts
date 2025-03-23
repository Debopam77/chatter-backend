import { MessagesModel, MessagesDocument } from "../models/Messages";
import mongoose from "mongoose";

export const createMessage = async (messageData: MessagesDocument): Promise<MessagesDocument|null> => {
    delete messageData._id;
    const message = new MessagesModel(messageData);
    return message.save();
}

export const getMessagesByConversationId = async (conversationId: string): Promise<MessagesDocument[]|null> => {
    const messages = await MessagesModel.find({
        conversationId: new mongoose.Types.ObjectId(conversationId)
    }).lean().sort({timeStamp: 1});
    return messages;
}

export const deleteMessages = async (messageId: string): Promise<MessagesDocument|null> => {
    const deletedMessage = MessagesModel.findByIdAndDelete(messageId);

    return deletedMessage;
}