import { Router } from "express"
import loanValidate from "../middlewares/inventory_loansValidate.middleware.js"
import { createLoanSchema, updateLoanSchema } from "../schemas/schemaErrors.js";
import { getLoans, getLoansID, createLoans, deleteLoan, updateLoan } from "../controlers/inventory.controlers.js"
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js"

const router = Router()

router.get('/loans', authMiddleware, authorizeRoles(1, 2), getLoans);

router.get('/loans/:id', authMiddleware, authorizeRoles(1, 2), getLoansID);

router.post('/loans', authMiddleware, authorizeRoles(1), loanValidate(createLoanSchema), createLoans);

router.delete('/loans/:id', authMiddleware, authorizeRoles(1), deleteLoan);

router.put('/loans/:id', authMiddleware, authorizeRoles(1), loanValidate(updateLoanSchema), updateLoan);

export default router;