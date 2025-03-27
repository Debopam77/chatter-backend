import {UserDocument, UserModel} from '../models/User';

export const createUser = async (userData: UserDocument): Promise<UserDocument> => {
    const user = new UserModel(userData);
    return user.save();
}

export const getUserById = async(userId: string): Promise<UserDocument | null> => {
    return UserModel.findById(userId).exec();
}
export const getUserByEmail = async(email: string): Promise<[]> => {
    let result: any = [];
    const users: UserDocument[] = await UserModel.find({email: {$regex: email, $options: "i"}}).lean();

    if(users.length > 0) {
        result = users.map((user) => ({username: user.username, _id: user._id, email: user.email}));
    }

    return result;
}

export const getUserByEmailPassword = async(email: string, password: string): Promise<any|null> => {
    const user: UserDocument|null = await UserModel.findOne({email: email}).select('+password');
    if(user) {
        // User found, now check password
        const match: boolean = await user.comparePassword(password);
        if(match) {
            return {
                _id: user._id,
                username: user.username,
                email: user.email
            };
        }
    }
    return null;
}

export const deleteUserById = async(userId: string):  Promise<UserDocument | null> => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId).exec();
        return deletedUser;
    } catch(error) {
        throw error;
    }
}

export const updateUserById = async(userId: string, user: UserDocument): Promise<UserDocument|null> => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, user).exec();
        return updatedUser;
    } catch(error) {
        throw error;
    }
}