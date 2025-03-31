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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = void 0;
const socket_io_1 = require("socket.io");
const Messages_1 = require("../models/Messages");
const Conversations_1 = require("../models/Conversations");
const setupSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        console.log('A user is connected');
        socket.on('joinRoom', (conversationId) => {
            socket.join(conversationId);
        });
        socket.on('sendMessage', (messageData) => __awaiter(void 0, void 0, void 0, function* () {
            delete messageData._id;
            try {
                const message = new Messages_1.MessagesModel(messageData);
                yield message.save();
                io.to(messageData.conversationId.toString()).emit('newMessage', message);
                // Update lastMessageAt on the conversation
                yield Conversations_1.ConversationsModel.findByIdAndUpdate(messageData.conversationId, { lastMessageAt: Date.now() });
            }
            catch (error) {
                console.error('Error occurred while sending message', error);
            }
        }));
        socket.on('disconnect', () => {
            console.log("A user disconnected");
        });
    });
    return io;
};
exports.setupSocket = setupSocket;
