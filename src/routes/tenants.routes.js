import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js";
import { postTenants, getTenants, getTenantById , putTenantById } from "../controlers/tenants.controlers.js";

const router = Router();

router.post("/tenants", authorizeRoles(1), postTenants );
router.get("/tenants", authorizeRoles(1, 2), getTenants);
router.get("/tenants/:id" , authorizeRoles(1, 2), getTenantById);
router.put("/tenants/:id", authorizeRoles(1, 2), putTenantById);

export default router;