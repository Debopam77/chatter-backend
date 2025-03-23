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
exports.deleteMessages = exports.getMessagesByConversationId = exports.createMessage = void 0;
const Messages_1 = require("../models/Messages");
const mongoose_1 = __importDefault(require("mongoose"));
const createMessage = (messageData) => __awaiter(void 0, void 0, void 0, function* () {
    delete messageData._id;
    const message = new Messages_1.MessagesModel(messageData);
    return message.save();
});
exports.createMessage = createMessage;
const getMessagesByConversationId = (conversationId) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield Messages_1.MessagesModel.find({
        conversationId: new mongoose_1.default.Types.ObjectId(conversationId)
    }).lean().sort({ timeStamp: 1 });
    return messages;
});
exports.getMessagesByConversationId = getMessagesByConversationId;
const deleteMessages = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedMessage = Messages_1.MessagesModel.findByIdAndDelete(messageId);
    return deletedMessage;
});
exports.deleteMessages = deleteMessages;
