import { Router } from "express";
import {authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js";
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
router.post("/request/contracts", authorizeRoles(1), postRcontract);
router.get("/request/contracts", authorizeRoles(1), getAllRcontracts);
router.get("/request/contracts/:id", authorizeRoles(1), getRcontractById);
router.put("/request/contracts/:id", authorizeRoles(1), putRcontractById);
router.delete("/request/contracts/:id", authorizeRoles(1), DeleteRcontractById);


export default router;