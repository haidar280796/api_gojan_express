import { Transaction } from "sequelize";
import User from "../models/userModel";
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
        const user = await User.findByPk(userId);
        return user;
    } catch (error) {
        throw new Error(`${error}`);
    }
}

const save = async (reqData: userType, t?: Transaction) => {
    try {
        const user = await User.create(reqData, {
            transaction: t
        });
        return user;
    } catch (error) {
        throw new Error(`${error}`);
    }
}

const userRepository = {
    getAll,
    getById,
    save,
}

export default userRepository;