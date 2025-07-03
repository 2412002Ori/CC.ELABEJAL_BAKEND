import { Router } from "express";
import { getAlldata, getdataById, getPagosData } from "../controlers/stadisticts.controlers.js";  

const router = Router();

router.get("/stadistics/:year", getAlldata);
router.get("/stadistics/:id/:year", getdataById);
router.get("/stadistics/pagos", getPagosData);
router.get("/stadistics", getAlldata);



export default router;