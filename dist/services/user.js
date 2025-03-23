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
exports.updateUserById = exports.deleteUserById = exports.getUserByEmailPassword = exports.getUserById = exports.createUser = void 0;
const User_1 = require("../models/User");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.UserModel(userData);
    return user.save();
});
exports.createUser = createUser;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return User_1.UserModel.findById(userId).exec();
});
exports.getUserById = getUserById;
const getUserByEmailPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.UserModel.findOne({ email: email }).select('+password');
    if (user) {
        // User found, now check password
        const match = yield user.comparePassword(password);
        if (match) {
            return {
                _id: user._id,
                username: user.username,
                email: user.email
            };
        }
    }
    return null;
});
exports.getUserByEmailPassword = getUserByEmailPassword;
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User_1.UserModel.findByIdAndDelete(userId).exec();
        return deletedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUserById = deleteUserById;
const updateUserById = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield User_1.UserModel.findByIdAndUpdate(userId, user).exec();
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserById = updateUserById;
