import { Request, Response } from "express";
import userRepository from "../repositories/userRepository";
import jsonResponse from "../helpers/jsonResponse";
import userType from "../types/userTypes";
import counterIdRepository from "../repositories/counterIdRepository";
import { getMonth, getYear } from "../helpers/getPeriode";
import { UniqueConstraintError } from "sequelize";
import { COUNTER_ID_USER, COUNTER_PREFIX_USER, USER_ROLES } from "../constants/counterSetting";

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userRepository.getAll();
        return jsonResponse({ res, statusNumber: 200, data: users, message: null });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch users' });
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userRepository.getById(req.params.userId);
        if (!user) {
            return jsonResponse({ res, statusNumber: 404, data: null, message: "User doesn't exists" });
        }

        jsonResponse({ res, statusNumber: 200, data: user, message: null });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch users' });
    }
}

const createUser = async (req: Request, res: Response) => {
    if (USER_ROLES.indexOf(req.body.role) < 0) {
        return jsonResponse({ res, statusNumber: 400, data: null, message: "Role doesn't exists" });
    } 

    try {
        let counterId = await counterIdRepository.getByIdAndPeriod(COUNTER_ID_USER, getYear, getMonth);
        let lastCounter = counterId === null ? 1 : counterId.toJSON().last_counter;

        let dataCounter = {
            counter_id: COUNTER_ID_USER,
            pyear: getYear,
            pmonth: getMonth,
            prefix: COUNTER_PREFIX_USER,
            last_counter: lastCounter,
            reset: false,
        }

        if (counterId !== null) {
            lastCounter += 1;
            dataCounter.last_counter = lastCounter;
            await counterIdRepository.update(dataCounter);
        } else {
            await counterIdRepository.save(dataCounter);
        }

        let userData: userType = {
            id: COUNTER_PREFIX_USER + lastCounter.toString().padStart(5, '0'),
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        }
        let user:any = await userRepository.save(userData);
        user = await userRepository.getById(user.toJSON().id);
        return jsonResponse({ res, statusNumber: 200, data: user, message: 'Create user account successfully' });
    } catch (err: any) {
        if (err instanceof UniqueConstraintError) {
            return jsonResponse({ res, statusNumber: 400, data: null, message: 'Username already exists' });
        }
        return jsonResponse({ res, statusNumber: 400, data: null, message: 'Failed to save users' });
    }
}

const updateUser = async (req: Request, res: Response) => {
    if (USER_ROLES.indexOf(req.body.role) < 0) {
        return jsonResponse({ res, statusNumber: 400, data: null, message: "Role doesn't exists" });
    } 
    
    try {
        const currentUser = await userRepository.getById(req.params.userId);
        if (!currentUser) {
            return jsonResponse({ res, statusNumber: 404, data: null, message: "User doesn't exists" });
        }

        let userData: userType = {
            id: req.params.userId,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        }
        await userRepository.update(req.params.userId, userData);
        let user = await userRepository.getById(req.params.userId);
        return jsonResponse({ res, statusNumber: 200, data: user, message: 'Update user account successfully' });
    } catch (err: any) {
        if (err instanceof UniqueConstraintError) {
            return jsonResponse({ res, statusNumber: 400, data: null, message: 'Username already exists' });
        }
        return jsonResponse({ res, statusNumber: 400, data: null, message: 'Failed to update users' });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    
    try {
        const currentUser = await userRepository.getById(req.params.userId);
        if (!currentUser) {
            return jsonResponse({ res, statusNumber: 404, data: null, message: "User doesn't exists" });
        }

        await userRepository.destroy(req.params.userId);
        jsonResponse({ res, statusNumber: 204, data: null, message: 'Delete user account successfully' });
    } catch (err: any) {
        return jsonResponse({ res, statusNumber: 400, data: null, message: 'Failed to delete users' });
    }
}

const userController = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
export default userController;

