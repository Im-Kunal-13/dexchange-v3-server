import express from "express"
import { insertTrade, getTrades } from "./trades.controller"

const router = express.Router()

router.get("/", getTrades)
router.post("/", insertTrade)

export default router
