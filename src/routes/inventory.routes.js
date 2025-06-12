import { Router } from "express"
<<<<<<< Updated upstream:routes/inventory.routes.js
import { getLoans, getLoansID, createLoans, deleteLoan, updateLoan } from "../controlers/inventory.controlers.js"
=======
import { getLoans, getLoansID, createLoans, deleteLoans, updateLoan } from "../controlers/inventory.controlers.js"
>>>>>>> Stashed changes:src/routes/inventory.routes.js


const router = Router()

router.get('/loans', getLoans);

router.get('/loans/:id', getLoansID)

router.post('/loans', createLoans);

router.delete('/loans/:id', deleteLoans);

router.put('/loans/:id', updateLoan);


export default router 