import express from "express"
import { insertTrade, getTrades } from "./trades.controller"

const router = express.Router()

router.post("/", insertTrade)
router.get("/", getTrades)

export default router
