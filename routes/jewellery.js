import express from "express";
import { getAllJewellery, getJewelleryById, deleteJewellery, addJewellery, updateJewellery } from "../controllers/jewellery.js";
import {authAdmin} from '../middlwares/auth.js';

const router = express.Router();

router.get("/", getAllJewellery);
router.get("/:id", getJewelleryById);
router.delete("/:id",authAdmin, deleteJewellery);
router.post("/",authAdmin, addJewellery);
router.put("/:id",authAdmin, updateJewellery);

export default router;