import { Router } from "express";
import {authMiddleware } from "../middlewares/authMiddleware.js";
import cors from "cors";
import { getAllRcontracts, getRcontractById , DeleteRcontractById , postRcontract, putRcontractById} from "../controlers/request_contracts.controlers.js";

const router = Router();

router.use(cors());

// Rutas con autenticación (para producción)
// router.post("/request/contracts", authMiddleware , postRcontract);
// router.get("/request/contracts", authMiddleware , getAllRcontracts);
// router.get("/request/contracts/:id", authMiddleware, getRcontractById);
// router.put("/request/contracts/:id", authMiddleware, putRcontractById);
// router.delete("/request/contracts/:id", authMiddleware, DeleteRcontractById);

// Rutas sin autenticación (para desarrollo)
router.post("/request/contracts", postRcontract);
router.get("/request/contracts", getAllRcontracts);
router.get("/request/contracts/:id", getRcontractById);
router.put("/request/contracts/:id", putRcontractById);
router.delete("/request/contracts/:id", DeleteRcontractById);


export default router;