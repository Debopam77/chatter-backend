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
exports.deleteUserById = exports.updateUserById = exports.login = exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;
const userService = __importStar(require("../services/user"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.createUser(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createUser = createUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUserById(req.params.id);
        if (!user) {
            res.status(404).send("User not found!");
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.email) {
            res.status(403).json({ message: 'Malformed URL' });
            return;
        }
        const email = (typeof (req.query.email) === 'string') ? req.query.email : '';
        const users = yield userService.getUserByEmail(email);
        if (users.length === 0) {
            res.status(404).send([]);
            return;
        }
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserByEmail = getUserByEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUserByEmailPassword(req.body.email, req.body.password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        // Otherwise, generate token and such, To Do
        // Generate a JWT token
        //     const token = jwt.sign(
        //     { userId: user._id },
        //     process.env.JWT_SECRET, // Use a secure secret key from environment variables
        //     { expiresIn: '1h' } // Token expiration time
        //   );
        res.status(200).json({ user, token: '12345678' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.login = login;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the existing user object
        const user = yield userService.getUserById(req.params.id);
        if (!user) {
            res.status(404).send("User not found!");
            return;
        }
        // Compare request body and user object
        for (let key in req.body) {
            user.set(key, req.body[key]);
        }
        ;
        yield userService.updateUserById(req.params.id, user);
        res.status(200).json({ message: "User update successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUserById(req.params.id);
        if (!user) {
            res.status(404).send("User not found!");
            return;
        }
        yield userService.deleteUserById(req.params.id);
        res.status(200).json({ message: "User removed" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUserById = deleteUserById;
