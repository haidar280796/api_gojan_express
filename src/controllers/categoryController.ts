import { Request, Response } from "express";
import userRepository from "../repositories/userRepository";
import jsonResponse from "../helpers/jsonResponse";
import userType from "../types/userTypes";
import counterIdRepository from "../repositories/counterIdRepository";
import { getMonth, getYear } from "../helpers/getPeriode";
import { UniqueConstraintError } from "sequelize";
import { COUNTER_ID_CATEGORY, COUNTER_PREFIX_CATEGORY, USER_ROLES } from "../constants/counterSetting";
import categoryRepository from "../repositories/categoryRepository";

const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryRepository.getAll();
        return jsonResponse({ res, statusNumber: 200, data: categories, message: null });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch users' });
    }
}

const getCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryRepository.getById(req.params.userId);
        if (!category) {
            return jsonResponse({ res, statusNumber: 404, data: null, message: "Category doesn't exists" });
        }

        jsonResponse({ res, statusNumber: 200, data: category, message: null });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch category' });
    }
}

const createCategory = async (req: Request, res: Response) => {
    try {
        let counterId = await counterIdRepository.getByIdAndPeriod(COUNTER_ID_CATEGORY, getYear, getMonth);
        let lastCounter = counterId === null ? 1 : counterId.toJSON().last_counter;

        let dataCounter = {
            counter_id: COUNTER_ID_CATEGORY,
            pyear: getYear,
            pmonth: getMonth,
            prefix: COUNTER_PREFIX_CATEGORY,
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
            id: COUNTER_PREFIX_CATEGORY + lastCounter.toString().padStart(5, '0'),
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

const updateCategory = async (req: Request, res: Response) => {
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

const deleteCategory = async (req: Request, res: Response) => {
    
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

const categoryController = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
export default categoryController;

