import { object, string, TypeOf } from "zod"

export const tradeSchema = {
    body: object({
        amount: string({
            required_error: "Please enter an amount !",
        }),
        price: string({
            required_error: "Please enter a price !",
        }),
        date: string({
            required_error: "Please enter a date !",
        }),
        txHash: string({ required_error: "Transaction hash is required !" }),
        side: string({ required_error: "Transaction must have a side !" }),
        address: string({ required_error: "Transaction must have an address !" }),
    }),
}

export type InsertTradeBody = TypeOf<typeof tradeSchema.body>
