import express from 'express';
import http, { Server } from 'http';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
// Routes
import userRoutes from './routes/user';
import messagesRoutes from './routes/messages';
import conversationsRoutes from './routes/conversations';
dotenv.config({path: path.resolve(__dirname, 'env', 'dev.env')});
import connectToDB from './config/db';
import { setupSocket } from './sockets/socketManager';
const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

const PORT = process.env.PORT;
connectToDB();

// Use configs
app.use(cors());
app.use(express.json());

// Use routes
app.use(userRoutes);
app.use(messagesRoutes);
app.use(conversationsRoutes);


server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export {io};

