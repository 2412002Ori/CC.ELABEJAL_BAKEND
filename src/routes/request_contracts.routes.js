import { Router } from "express";
import {authMiddleware } from "../middlewares/authMiddleware.js";
import cors from "cors";
import { getAllRcontracts, getRcontractById , DeleteRcontractById , postRcontract, putRcontractById} from "../controlers/request_contracts.controlers.js";

const router = Router();

router.use(cors());


router.post("/request/contracts", postRcontract);
router.get("/request/contracts", getAllRcontracts);
router.get("/request/contracts/:id", authMiddleware, getRcontractById);
router.put("/request/contracts/:id", authMiddleware, putRcontractById);
router.delete("/request/contracts/:id", authMiddleware, DeleteRcontractById);


export default router;