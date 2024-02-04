import express from "express";
import { getAllOrders, getOrderByUserId, deleteOrder, addOrder, updatOrder } from "../controllers/orders.js";
import {authAdmin,auth} from "../middlwares/auth.js";

const router = express.Router();

router.get("/all",authAdmin, getAllOrders);
router.get("/",auth, getOrderByUserId);
router.delete("/:id",auth,authAdmin, deleteOrder);
router.post("/",auth, addOrder);
router.put("/:id",authAdmin, updatOrder);

export default router;