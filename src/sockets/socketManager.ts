import {Server, Socket} from 'socket.io';
import http from 'http';
import { MessagesDocument, MessagesModel } from '../models/Messages';
import { ConversationsModel } from '../models/Conversations';

export const setupSocket = (server: http.Server): Server => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ['GET', 'POST'],
        },
    });

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
                io.to(messageData.conversationId.toString()).emit('newMessage', message);
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
    return io;
};