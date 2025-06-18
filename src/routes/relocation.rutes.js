import { Router } from "express";
import { postRelocation, getAllRelocation, getRelocationById, putRelocationById } from "../controlers/relocation.controlers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/Relocation", authMiddleware, postRelocation);
router.get("/Relocation", authMiddleware, getAllRelocation);
router.get("/Relocation/:id", authMiddleware, getRelocationById);
router.put("/Relocation/:id", authMiddleware, putRelocationById);

export default router;