import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js";
import { getAllContracts, getContractById , postContract} from "../controlers/contracts.controlers.js";

const router = Router();

// Rutas con autenticación (para producción)
// router.post("/contracts", authMiddleware , postContract);
// router.get("/contracts", authMiddleware ,  getAllContracts);
// router.get("/contracts/:id", authMiddleware ,  getContractById);

// Rutas sin autenticación (para desarrollo)
router.post("/contracts", authorizeRoles(1), postContract);
router.get("/contracts", authorizeRoles(1), getAllContracts);
router.get("/contracts/:id", authorizeRoles(1), getContractById);


export default router;