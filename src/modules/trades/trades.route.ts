import express from "express"
import { getTrades } from "./trades.controller"

const router = express.Router()

router.get("", getTrades)
export default router
