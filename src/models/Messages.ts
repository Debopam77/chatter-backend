import mongoose, {Schema, Document, Model} from "mongoose";

// Messages interface and schema
type MessagesDocument = Document & {
    conversationId: mongoose.Types.ObjectId,
    senderId: mongoose.Types.ObjectId,
    senderName: string,
    content: string,
    type: "text" | "image" | "file",
    timestamp: Date,
    readBy: mongoose.Types.ObjectId[]
}

const MessagesSchema = new Schema<MessagesDocument>({
        conversationId: {type: Schema.Types.ObjectId, ref: 'Conversations', required: true},
        senderId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        senderName: {type: String, required: false},
        content: {type: String, required: true},
        type: { type: String, enum: ['text', 'image', 'file'], required: true },
        timestamp: {type: Date, default: Date.now},
        readBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
    },
    { timestamps: true }
);

const MessagesModel: Model<MessagesDocument> = mongoose.model<MessagesDocument>('Messages', MessagesSchema);

export {MessagesDocument, MessagesModel};