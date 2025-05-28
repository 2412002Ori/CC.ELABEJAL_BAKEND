import { Router } from "express";
import { getAlldata, getdataById } from "../controlers/stadisticts.controlers.js";  

const router = Router();

router.get("/stadistics", getAlldata);
router.get("/stadistics/:id", getdataById);



export default router;