import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { postTenants, getTenants, getTenantById , putTenantById,  } from "../controlers/tenants.controlers.js";

const router = Router();

router.post("/tenants", authMiddleware ,postTenants );
router.get("/tenants", authMiddleware , getTenants);
router.get("/tenants/:id", authMiddleware , getTenantById);
router.put("/tenants/:id", authMiddleware ,putTenantById); 


export default router;