import {Request, Response} from 'express';
import * as userService from '../services/user';
import { UserDocument } from '../models/User';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    }catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if(!user) {
            res.status(404).send("User not found!");
            return;
        }
        res.status(200).json(user);
    }catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        if(!req.query.email) {
            res.status(403).json({message: 'Malformed URL'});
            return;
        }
        const email: string = (typeof(req.query.email) === 'string') ? req.query.email : '' ;
        const users: [] = await userService.getUserByEmail(email);
        if(users.length === 0) {
            res.status(404).send([]);
            return;
        }
        res.status(200).json(users);
    }catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const login = async(req: Request, res: Response) => {
    try {
        const user = await userService.getUserByEmailPassword(req.body.email, req.body.password);
        if(!user) {
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        // Otherwise, generate token and such, To Do
        // Generate a JWT token
    //     const token = jwt.sign(
    //     { userId: user._id },
    //     process.env.JWT_SECRET, // Use a secure secret key from environment variables
    //     { expiresIn: '1h' } // Token expiration time
    //   );
        res.status(200).json({user, token: '12345678'});
    }catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export const updateUserById = async (req: Request, res: Response) => {
    try {
        // Get the existing user object
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            res.status(404).send("User not found!");
            return;
        }
        // Compare request body and user object
        for(let key in req.body) {
            user.set(key, req.body[key]);
        };
        await userService.updateUserById(req.params.id, user);
        res.status(200).json({message: "User update successfully"});
    }catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            res.status(404).send("User not found!");
            return;
        }
        await userService.deleteUserById(req.params.id);
        res.status(200).json({message: "User removed"});
    }catch (error: any) {
        res.status(500).json({message: error.message});
    }
};