import { Router } from "express";
import { postRelocation, getAllRelocation, getRelocationById, putRelocationById } from "../controlers/relocation.controlers.js";
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/Relocation", authMiddleware, authorizeRoles(1, 3), postRelocation);
router.get("/Relocation", authMiddleware, authorizeRoles(1, 3), getAllRelocation);
router.get("/Relocation/:id", authMiddleware, authorizeRoles(1, 3), getRelocationById);
router.put("/Relocation/:id", authMiddleware, authorizeRoles(1, 3), putRelocationById);

export default router;