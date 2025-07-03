import { Router } from "express";
import { getAlldata, getdataById } from "../controlers/stadisticts.controlers.js"; 
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js"; 

const router = Router();

router.get("/stadistics/:year", authorizeRoles(1, 3), getAlldata);
router.get("/stadistics/:id/:year", authorizeRoles(1, 3), getdataById);



export default router;