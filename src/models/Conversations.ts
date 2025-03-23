import mongoose, {Schema, Document, Model} from "mongoose";

// Conversations interface and Schema
type ConversationsDocument = Document & {
    type: 'private' | 'group';
    participants: mongoose.Types.ObjectId[];
    name?: string;
    createdAt: Date;
    lastMessageAt?: Date;
};

const ConversationsSchema = new Schema<ConversationsDocument>({
        type: {type: String, enum: ['private', 'group'], required: true},
        participants: [{type: Schema.Types.ObjectId, ref:'User', required: true}],
        name: {type: String},
        createdAt: {type: Date, default: Date.now},
        lastMessageAt: {type: Date}
    },
    {timestamps: true}
);

const ConversationsModel: Model<ConversationsDocument> = mongoose.model<ConversationsDocument>('Conversations', ConversationsSchema);

export {ConversationsModel, ConversationsDocument};