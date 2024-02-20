import { Request, Response } from "express";
import userService from "../services/userService";
import jsonResponse from "../helpers/jsonResponse";
import userType from "../types/userTypes";

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAll();
        jsonResponse({ res, statusNumber: 200, data: users, message: null });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users.' + error });
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.getById(req.params.userId);
        jsonResponse({ res, statusNumber: 200, data: user, message: null });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users.' + error });
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        let userData:userType = {
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
        }
        console.log(req.body);
        const user = await userService.save(userData);
        jsonResponse({ res, statusNumber: 200, data: user, message: null });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users.' + error });
    }
}

const userController = {
    getUsers,
    getUser,
    createUser,

}
export default userController;