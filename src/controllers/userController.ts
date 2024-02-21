import { Request, Response } from "express";
import userRepository from "../repositories/userRepository";
import jsonResponse from "../helpers/jsonResponse";
import userType from "../types/userTypes";
import counterIdRepository from "../repositories/counterIdRepository";
import { getMonth, getYear } from "../helpers/getPeriode";

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userRepository.getAll();
        jsonResponse({ res, statusNumber: 200, data: users, message: null });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users.' + error });
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userRepository.getById(req.params.userId);
        jsonResponse({ res, statusNumber: 200, data: user, message: null });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users.' + error });
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const counterId = await counterIdRepository.getByIdAndPeriod('mst_user', getYear, getMonth);
        // let userData:userType = {
        //     id: req.body.id,
        //     username: req.body.username,
        //     password: req.body.password,
        // }
        // console.log(req.body);
        // const user = await userRepository.save(userData);
        jsonResponse({ res, statusNumber: 200, data: counterId, message: null });
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