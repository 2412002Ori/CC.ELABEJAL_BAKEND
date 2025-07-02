import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { postTenants, getTenants, getTenantById , putTenantById, deleteTenantById } from "../controlers/tenants.controlers.js";

const router = Router();

router.post("/tenants", postTenants );
router.get("/tenants", getTenants);
router.get("/tenants/:id" , getTenantById);
router.put("/tenants/:id", putTenantById);
router.delete("/tenants/:id", deleteTenantById);

export default router;