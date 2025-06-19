import { Router } from "express";
import { postTenants, getTenants, getTenantById , putTenantById,  } from "../controlers/tenants.controlers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/tenants",authMiddleware , postTenants );
router.get("/tenants", authMiddleware , getTenants);
router.get("/tenants/:id", authMiddleware , getTenantById);
router.put("/tenants/:id", authMiddleware , putTenantById);


export default router;