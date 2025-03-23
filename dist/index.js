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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const Messages_1 = require("./models/Messages");
const Conversations_1 = require("./models/Conversations");
const socketIo = require('socket.io');
// Routes
const user_1 = __importDefault(require("./routes/user"));
const messages_1 = __importDefault(require("./routes/messages"));
const conversations_1 = __importDefault(require("./routes/conversations"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, 'env', 'dev.env') });
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});
const PORT = process.env.PORT;
(0, db_1.default)();
// Use configs
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Use routes
app.use(user_1.default);
app.use(messages_1.default);
app.use(conversations_1.default);
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
            io.to(messageData.conversationId).emit('newMessage', message);
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
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
