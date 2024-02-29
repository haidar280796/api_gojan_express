import { Transaction } from "sequelize";
import User from "../models/userModel";
import userType from "../types/userTypes";

const getAll = async () => {
    try {
        const users = await User.scope('withoutPassword').findAll();
        return Promise.resolve(users);
    } catch (error) {
        throw new Error(`${error}`);
    }
}

const getById = async (userId: any) => {
    try {
        const user = await User.findByPk(userId);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
}

const save = async (reqData: userType, t?: Transaction) => {
    try {
        const user = await User.create(reqData, {
            transaction: t
        });
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
}

const update = async (userId: any, reqData: userType, t?: Transaction) => {
    try {
        const user = await User.update(reqData, {
            where: {
                id: userId
            },
            transaction: t
        });
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
}

const destroy = async (userId: any, t?: Transaction) => {
    try {
        const user = await User.destroy({
            where: {
                id: userId
            },
            transaction: t
        });
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
}

const userRepository = {
    getAll,
    getById,
    save,
    update,
    destroy
}

export default userRepository;