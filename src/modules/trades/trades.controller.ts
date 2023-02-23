import { Request } from "express"
import expressAsyncHandler from "express-async-handler"
import { TradeModel } from "./trades.model"
import { InsertTradeBody } from "./trades.schema"

/**
 @desc Adds a new transaction
 @route POST /api/trades/
 @access  Public
*/
export const insertTrade = expressAsyncHandler(
    async (req: Request<{}, {}, InsertTradeBody>, res) => {
        const { amount, date, price, side, txHash, address } = req.body

        if (!amount || !date || !price || !side || !txHash || !address) {
            res.status(400)
            throw new Error("Please add all fields")
        }

        // Insert Trade
        const trade = await TradeModel.create({
            amount,
            date,
            price,
            side,
            txHash,
            address,
        })

        if (trade) {
            res.status(201).json({
                amount,
                date,
                price,
                side,
                txHash,
                address,
            })
        } else {
            res.status(400)
            throw new Error("Invalid user data")
        }
    }
)


/**
@desc Get all trades
@route GET /api/trades
@access Public
*/
export const getTrades = expressAsyncHandler(async (req, res) => {
    const trades = await TradeModel.find()
    res.status(200).json(trades)
})