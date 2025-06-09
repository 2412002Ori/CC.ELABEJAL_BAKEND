import { Router } from "express";
import { getAllRcontracts, getRcontractById , DeleteRcontractById , postRcontract, putRcontractById} from "../controllers/request_contracts.controlers.js";

const router = Router();


router.post("/request/contracts",postRcontract);
router.get("/request/contracts", getAllRcontracts);
router.post("/request/contracts/:id", getRcontractById);
router.put("/request/contracts/:id", putRcontractById); 
router.delete("/request/contracts/:id", DeleteRcontractById); 


export default router;