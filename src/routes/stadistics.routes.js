import { Router } from "express";
import { getAlldata, getdataById } from "../controlers/stadisticts.controlers.js";  
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/stadistics/:year", authMiddleware , getAlldata);
router.get("/stadistics/:id/:year", authMiddleware , getdataById);



export default router;