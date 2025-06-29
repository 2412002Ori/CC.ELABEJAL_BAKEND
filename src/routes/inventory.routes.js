import { Router } from "express"
import { getLoans, getLoansID, createLoans, deleteLoans, updateLoan } from "../controlers/inventory.controlers.js"


const router = Router()

router.get('/loans', getLoans);

router.get('/loans/:id', getLoansID)

router.post('/loans', createLoans);

router.delete('/loans/:id', deleteLoans);

router.put('/loans/:id', updateLoan);


export default router 