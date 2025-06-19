import { Router } from "express"
import loanValidate from "../middlewares/inventory_loansValidate.middleware.js"
import { createLoanSchema, updateLoanSchema } from "../schemas/schemaZodErrors.js";
import { getLoans, getLoansID, createLoans, deleteLoan, updateLoan } from "../controlers/inventory.controlers.js"


const router = Router()

router.get('/loans', getLoans);

router.get('/loans/:id', getLoansID)

router.post('/loans', loanValidate(createLoanSchema), createLoans);

router.delete('/loans/:id', deleteLoan);

router.put('/loans/:id', loanValidate(updateLoanSchema), updateLoan);


export default router 