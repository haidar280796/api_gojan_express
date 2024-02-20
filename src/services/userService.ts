import User from "../models/user.model";
import userType from "../types/userTypes";

const getAll = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error(`${error}`);
    }
}

const getById = async (userId: any) => {
    try {
        const users = await User.findByPk(userId);
        return users;
    } catch (error) {
        throw new Error(`${error}`);
    }
}

const save = async (reqData: userType) => {
    try {
        const users = await User.create(reqData);
        return users;
    } catch (error) {
        throw new Error(`${error}`);
    }
}

const userService = {
    getAll,
    getById,
    save,
}

export default userService;