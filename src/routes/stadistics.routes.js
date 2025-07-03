import { Router } from "express";
import { getAlldata, getdataById, getPagosData } from "../controlers/stadisticts.controlers.js";  
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/stadistics/:year", authorizeRoles(1, 2), getAlldata);
router.get("/stadistics/:id/:year", authorizeRoles(1, 2), getdataById);
router.get("/stadistics/pagos", authorizeRoles(1, 2), getPagosData);
router.get("/stadistics", authorizeRoles(1, 2), getAlldata);



export default router;