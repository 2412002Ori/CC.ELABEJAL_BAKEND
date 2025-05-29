import { Router } from "express";
import { postPayments , getAllPayments , getPaymentsById , patchPaymentsById} from "../controlers/payments.controlers.js";

const router = Router();

router.post("/payments",postPayments);
router.get("/payments", getAllPayments);
router.get("/payments/:id", getPaymentsById);
router.patch("/payments/:id", patchPaymentsById); 

export default router;