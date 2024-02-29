import { Transaction } from "sequelize";
import Category from "../models/categoryModel";
import categoryType from "../types/categoryType";

const getAll = async () => {
    try {
        const categories = await Category.findAll();
        return Promise.resolve(categories);
    } catch (error) {
        return Promise.reject(error);
    }
}

const getById = async (categoryId: any) => {
    try {
        const category = await Category.findByPk(categoryId);
        return Promise.resolve(category);
    } catch (error) {
        return Promise.reject(error);
    }
}

const save = async (reqData: categoryType, t?: Transaction) => {
    try {
        const category = await Category.create(reqData, {
            transaction: t
        });
        return Promise.resolve(category);
    } catch (error) {
        return Promise.reject(error);
    }
}

const update = async (categoryId: any, reqData: categoryType, t?: Transaction) => {
    try {
        const category = await Category.update(reqData, {
            where: {
                id: categoryId
            },
            transaction: t
        });
        return Promise.resolve(category);
    } catch (error) {
        return Promise.reject(error);
    }
}

const destroy = async (categoryId: any, t?: Transaction) => {
    try {
        const user = await Category.destroy({
            where: {
                id: categoryId
            },
            transaction: t
        });
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
}

const categoryRepository = {
    getAll,
    getById,
    save,
    update,
    destroy
}

export default categoryRepository;