import mongoose, {Schema, Document, Model, CallbackError} from "mongoose";
const bcrypt = require('bcrypt');

// User interface and Schema
type UserDocument = Document & {
    username: string;
    email: string;
    profilePicture?: string;
    password: string;
};

declare module 'mongoose' {
    interface Document {
      comparePassword(candidatePassword: string): Promise<boolean>;
    }
}

const UserSchema = new Schema<UserDocument>({
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        profilePicture: {type: String},
        password: { type: String, required: true, select: false },
    },
    {timestamps: true}
);

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT ?? "10"));
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(error: any) {
        console.log(error);
        return next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch(error) {
        console.log(error);
        return false;
    }
}

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);

export {UserModel, UserDocument};