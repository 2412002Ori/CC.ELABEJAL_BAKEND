import { Router } from "express";
import { getAlldata, getdataById } from "../controlers/stadisticts.controlers.js";  

const router = Router();

router.get("/stadistics/:year", getAlldata);
router.get("/stadistics/:id/:year", getdataById);



export default router;