import { Response } from "express";

interface resType {
    res: Response
    statusNumber: number,
    data: any,
    message: string | null
}

const jsonResponse = (params: resType) => {
    params.res.status(params.statusNumber).json({
        status: params.statusNumber,
        data: params.data,
        message: params.message
    })
}

export default jsonResponse;