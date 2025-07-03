import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js";
import { postPayment , getAllPayments , getPaymentsById , patchPaymentsById , deletepaymentsById} from "../controlers/payments.controlers.js";

const router = Router();

router.post("/payments", authMiddleware, authorizeRoles(1, 2, 3), postPayment);
router.get("/payments", authMiddleware, authorizeRoles(1, 2, 3), getAllPayments);
router.get("/payments/:id", authMiddleware, authorizeRoles(1, 2, 3), getPaymentsById);
router.patch("/payments/:id", authMiddleware, authorizeRoles(1, 2, 3), patchPaymentsById);
router.delete("/payments/:id", authMiddleware, authorizeRoles(1, 2, 3), deletepaymentsById);

export default router;