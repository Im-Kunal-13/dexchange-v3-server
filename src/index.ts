const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const helmet = require("helmet")

const { connectToDatabase } = require("./utils/database")

import tradesRoute from "./modules/trades/trades.route"
// const tradesRoute = require("./modules/trades/trades.route")

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

// Routes
app.use("/api/trades", tradesRoute)

const server = app.listen(PORT, async () => {
    await connectToDatabase()
    console.log(`Server listening at http://localhost:${PORT}`)
})
