import { Router } from "express";
import { postPayments , getAllPayments , getPaymentsById , patchPaymentsById , deletepaymentsById} from "../controlers/payments.controlers.js";

 
const router = Router();

router.post("/payments",postPayments); 
router.get("/payments", getAllPayments);
router.get("/payments/:id", getPaymentsById);
router.patch("/payments/:id", patchPaymentsById); 
router.delete ("/payments/:id", deletepaymentsById);

export default router;