import { Router } from "express";
import { postTenants, getTenants, getTenantById , putTenantById,  } from "../controlers/tenants.controlers.js";

const router = Router();

router.post("/tenants",postTenants );
router.get("/tenants", getTenants);
router.get("/tenants/:id", getTenantById);
router.put("/tenants/:id", putTenantById); 


export default router;