"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversationById = exports.deleteConversationById = exports.getConversationsByUserId = exports.createConversation = void 0;
const Conversations_1 = require("../models/Conversations");
const mongoose_1 = __importDefault(require("mongoose"));
const createConversation = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new Conversations_1.ConversationsModel(userData);
    return user.save();
});
exports.createConversation = createConversation;
const getConversationsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversations = yield Conversations_1.ConversationsModel.find({
            participants: { $in: [new mongoose_1.default.Types.ObjectId(userId)] }
        }).populate('participants');
        return conversations;
    }
    catch (error) {
        throw error;
    }
});
exports.getConversationsByUserId = getConversationsByUserId;
const deleteConversationById = (conversationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedConversation = yield Conversations_1.ConversationsModel.findByIdAndDelete(conversationId).exec();
        return deletedConversation;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteConversationById = deleteConversationById;
const getConversationById = (conversationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation = yield Conversations_1.ConversationsModel.findById(conversationId).exec();
        return conversation;
    }
    catch (error) {
        throw error;
    }
});
exports.getConversationById = getConversationById;
