import { Router } from "express";
import { getAllContracts, getContractById , postContract} from "../controlers/contracts.controlers.js";

const router = Router();

router.post("/contracts",postContract);
router.get("/contracts", getAllContracts);
router.get("/contracts/:id", getContractById);


export default router;