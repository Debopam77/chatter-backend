"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Routes
const user_1 = __importDefault(require("./routes/user"));
const messages_1 = __importDefault(require("./routes/messages"));
const conversations_1 = __importDefault(require("./routes/conversations"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, 'env', 'dev.env') });
const db_1 = __importDefault(require("./config/db"));
const socketManager_1 = require("./sockets/socketManager");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = (0, socketManager_1.setupSocket)(server);
exports.io = io;
const PORT = process.env.PORT;
(0, db_1.default)();
// Use configs
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Use routes
app.use(user_1.default);
app.use(messages_1.default);
app.use(conversations_1.default);
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
