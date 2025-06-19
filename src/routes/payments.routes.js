import { Router } from "express";
import { postPayment , getAllPayments , getPaymentsById , patchPaymentsById , deletepaymentsById} from "../controlers/payments.controlers.js";
import { authMiddleware} from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/payments", authMiddleware , postPayment);
router.get("/payments", authMiddleware , getAllPayments);
router.get("/payments/:id", authMiddleware , getPaymentsById);
router.patch("/payments/:id", authMiddleware , patchPaymentsById);
router.delete("/payments/:id", authMiddleware , deletepaymentsById);

export default router;