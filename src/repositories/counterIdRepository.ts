import CounterId from "../models/counterIdModel";
import counterIdType from "../types/counterIdType";

const getByIdAndPeriod = async (counterId: string, pyear: number, pmonth: number) => {
    try {
        const counter = await CounterId.findOne({
            where: {
                counter_id: counterId,
                pyear: pyear,
                pmonth: pmonth
            }
        });
        return Promise.resolve(counter);
    } catch (error) {
        return Promise.reject(error);
    }
}

const save = async (reqData: counterIdType) => {
    try {
        const counter = await CounterId.create(reqData);
        return Promise.resolve(counter);
    } catch (error) {
        return Promise.reject(error);
    }
}

const update = async (reqData: counterIdType) => {
    try {
        const counter = await CounterId.update({ last_counter: reqData.last_counter}, {
            where: {
                counter_id: reqData.counter_id,
                pyear: reqData.pyear,
                pmonth: reqData.pmonth,
            }
        });
        return Promise.resolve(counter);
    } catch (error) {
        return Promise.reject(error);
    }
}

const counterIdRepository = {
    getByIdAndPeriod,
    save,
    update,
}

export default counterIdRepository;