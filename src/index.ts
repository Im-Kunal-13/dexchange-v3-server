const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const helmet = require("helmet")

const {
    connectToDatabase,
    disconnectFromDatabase,
} = require("./utils/database")

import { createServer } from "http"
import { Server } from "socket.io"
import tradesRoute from "./modules/trades/trades.route"

//options for cors midddleware
const options = {
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: false,
}

dotenv.config()

// Initializing express app.
const app = express()
const PORT = process.env.PORT

app.use(cookieParser())
app.use(express.json())
app.use(cors(options))
app.use(helmet())

const httpServer = createServer(app)

export const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

// Routes
app.use("/api/trades", tradesRoute)

const server = httpServer.listen(PORT, async () => {
    await connectToDatabase()
    console.log(`Server listening at http://localhost:${PORT}`)
})

const signals = ["SIGTERM", "SIGINT"]

const gracefulShutdown = (signal: any) => {
    process.on(signal, async () => {
        console.log("Goodbye, got signal", signal)
        server.close()

        await disconnectFromDatabase()

        // disconnect from the db.

        console.log("My work here is done ")

        process.exit(0)
    })
}

// Running graceful shutdown if we get the signal.
for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i])
}
