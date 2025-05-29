import { Router } from "express"
import { getLoans, getLoansID, createLoans, deleteLoan, updateLoan } from "../controlers/inventories.controlers.js"


const router = Router()

router.get('/loans', getLoans);

router.get('/loans/:id', getLoansID)

router.post('/loas', createLoans);

router.delete('/loans/:id', deleteLoan);

router.put('/loans/:id', updateLoan);


export default router 