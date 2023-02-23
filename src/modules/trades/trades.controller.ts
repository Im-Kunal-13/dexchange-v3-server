import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export const getTrades = async (
    req: Request<{}, {}, { address?: string }>,
    res: Response
) => {
    const { address } = req.body
    res.status(StatusCodes.OK).send("working !")
}
