import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getAllContracts, getContractById , postContract} from "../controlers/contracts.controlers.js";

const router = Router();

// Rutas con autenticación (para producción)
// router.post("/contracts", authMiddleware , postContract);
// router.get("/contracts", authMiddleware ,  getAllContracts);
// router.get("/contracts/:id", authMiddleware ,  getContractById);

// Rutas sin autenticación (para desarrollo)
router.post("/contracts", postContract);
router.get("/contracts", getAllContracts);
router.get("/contracts/:id", getContractById);


export default router;