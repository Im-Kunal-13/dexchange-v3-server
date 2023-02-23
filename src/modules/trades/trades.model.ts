import { getModelForClass, prop } from "@typegoose/typegoose"

export class Trade {
    @prop({ required: true, type: () => String })
    public amount: string

    @prop({ required: true, type: () => String, unique: true })
    public date: string

    @prop({ type: () => String })
    public price: string

    @prop({ required: true, type: () => String, enum: ["sell", "buy"] })
    public side: string

    @prop({ required: true, type: () => String, unique: true })
    public txHash: string

    @prop({ type: () => String, default: "profileImage" })
    public address: string
}

export const TradeModel = getModelForClass(Trade, {
    schemaOptions: { versionKey: false, collection: "trades" },
})
