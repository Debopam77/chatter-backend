import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { Socket } from 'socket.io';
import { MessagesDocument, MessagesModel } from './models/Messages';
import { ConversationsModel } from './models/Conversations';
const socketIo = require('socket.io');
// Routes
import userRoutes from './routes/user';
import messagesRoutes from './routes/messages';
import conversationsRoutes from './routes/conversations';
dotenv.config({path: path.resolve(__dirname, 'env', 'dev.env')});
import connectToDB from './config/db';
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});

const PORT = process.env.PORT;
connectToDB();

// Use configs
app.use(cors());
app.use(express.json());

// Use routes
app.use(userRoutes);
app.use(messagesRoutes);
app.use(conversationsRoutes);

io.on('connection', (socket: Socket) => {
    console.log('A user is connected');
    socket.on('joinRoom', (conversationId: string) => {
        socket.join(conversationId);
    });

    socket.on('sendMessage', async (messageData: MessagesDocument) => {
        delete messageData._id;
        try {
            const message = new MessagesModel(messageData);
            await message.save();
            io.to(messageData.conversationId).emit('newMessage', message);
            // Update lastMessageAt on the conversation
            await ConversationsModel.findByIdAndUpdate(messageData.conversationId, {lastMessageAt: Date.now()});
        }catch (error) {
            console.error('Error occurred while sending message', error);
        }
    });

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

