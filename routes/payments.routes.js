import { Router } from "express";
import { postPayment , getAllPayments , getPaymentsById , patchPaymentsById , deletepaymentsById} from "../controlers/payments.controlers.js";

 
const router = Router();

router.post("/payments",postPayment); 
router.get("/payments", getAllPayments);
router.get("/payments/:id", getPaymentsById);
router.patct("/payments/:id", patchPaymentsById); 
router.delete ("/payments/:id", deletepaymentsById);

export default router;