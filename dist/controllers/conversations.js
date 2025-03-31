"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteConversationById = exports.getConversationById = exports.getConversationsByUserId = exports.createConversation = void 0;
const conversationsService = __importStar(require("../services/conversations"));
const index_1 = require("../index");
const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Magic should happen here, we need to emit the fact that a new message
        const conversation = yield conversationsService.createConversation(req.body);
        if (conversation) {
            yield conversation.populate('participants');
            conversation.participants.forEach((participant) => {
                console.log("Emiting new convo...");
                index_1.io.emit('newConversation', conversation);
            });
        }
        res.status(201).json(conversation);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createConversation = createConversation;
const getConversationsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.user_id;
        const conversations = yield conversationsService.getConversationsByUserId(userId);
        res.status(201).json(conversations);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getConversationsByUserId = getConversationsByUserId;
const getConversationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation = yield conversationsService.getConversationById(req.params.id);
        res.status(201).json(conversation);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getConversationById = getConversationById;
const deleteConversationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation = yield conversationsService.deleteConversationById(req.params.id);
        res.status(201).json(conversation);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteConversationById = deleteConversationById;
