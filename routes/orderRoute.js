import express from "express"
import { createOrder } from "controllers\orderController.js";
const orderRouter = express.Router();

orderRouter.post("/create", createOrder)
orderRouter.get("/",getOrders)
orderRouter.put("/:orderId/:status", updateOrderStatus)

export default orderRouter;