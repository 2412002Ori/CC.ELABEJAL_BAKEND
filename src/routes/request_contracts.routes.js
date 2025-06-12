import { Router } from "express";
import cors from "cors";
import { getAllRcontracts, getRcontractById , DeleteRcontractById , postRcontract, putRcontractById} from "../controlers/request_contracts.controlers.js";

const router = Router();

router.use(cors());


router.post("/request/contracts",postRcontract);
router.get("/request/contracts", getAllRcontracts);
router.get("/request/contracts/:id", getRcontractById);
router.put("/request/contracts/:id", putRcontractById); 
router.delete("/request/contracts/:id", DeleteRcontractById); 


export default router;