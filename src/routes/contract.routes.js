import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getAllContracts, getContractById , postContract} from "../controlers/contracts.controlers.js";

const router = Router();

router.post("/contracts", authMiddleware , postContract);
router.get("/contracts", authMiddleware ,  getAllContracts);
router.get("/contracts/:id", authMiddleware ,  getContractById);


export default router;