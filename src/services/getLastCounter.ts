import { getYear } from "../helpers/getPeriode";
import counterIdRepository from "../repositories/counterIdRepository";

const getIdNumber = async (counterId: string, pyear: number, pmonth: number, prefix?: string, reset?: boolean | null) => {
    let promise = new Promise(async (resolve, reject) => {
        let counterData = await counterIdRepository.getByIdAndPeriod(counterId, pyear, pmonth);
        let lastCounter = counterData === null ? 1 : counterData.toJSON().last_counter;
    
        let newData = {
            counter_id: counterId,
            pyear: pyear,
            pmonth: pmonth,
            prefix: prefix ?? null,
            last_counter: lastCounter,
            reset: reset ?? false,
        }
    
        if (counterData !== null) {
            lastCounter += 1;
            newData.last_counter = lastCounter;
            await counterIdRepository.update(newData);
        } else {
            await counterIdRepository.save(newData);
        }
    });
    return promise;

}