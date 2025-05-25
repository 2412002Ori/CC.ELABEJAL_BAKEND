import { Router } from "express";
import { getAllContracts, getContractById } from "../controlers/contracts.controlers.js";

const router = Router();

router.get("/contracts", getAllContracts);
router.get("/contracts/:id", getContractById);

export default router;