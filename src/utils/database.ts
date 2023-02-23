import mongoose from "mongoose"
import logger from "./logger"
import dotenv from "dotenv"
import { io } from "../index"

dotenv.config()

mongoose.set("strictQuery", true)

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || ""

// Function to connect to the mongodb database.
export const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_STRING, { dbName: "dexchange" })
        logger.info("Connected to Database")

        // Set up change stream listener for 'trades' collection
        const tradeCollection = mongoose.connection.collection("trades")

        const changeStream = tradeCollection.watch()

        changeStream.on("change", (change) => {
            if (change.operationType === "insert") {
                io.emit("new_trade_inserted", {
                    amount: change?.fullDocument?.amount,
                    date: change?.fullDocument?.date,
                    price: change?.fullDocument?.price,
                    side: change?.fullDocument?.side,
                    txHash: change?.fullDocument?.txHash,
                })
            }
        })
    } catch (error) {
        logger.error(error, "Failed to connect to the database. Good bye!")
        process.exit(1)
    }
}

export const disconnectFromDatabase = async () => {
    await mongoose.connection.close()

    logger.info("Disconnected from database.")

    return
}
