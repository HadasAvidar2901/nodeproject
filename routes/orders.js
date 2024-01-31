import express from "express";
import { getAllOrders, getOrderByUserId, deleteOrder, addOrder, updatOrder } from "../controllers/orders.js";
import {authAdmin,auth} from "../middlwares/auth.js";

const router = express.Router();

router.get("/",authAdmin, getAllOrders);
router.get("/:id",auth, getOrderByUserId);//רק זה לעשות
router.delete("/:id",auth,authAdmin, deleteOrder);
router.post("/",auth, addOrder);
router.put("/:id",authAdmin, updatOrder);

export default router;