import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUser, getUserID, createUser, deleteUser, updateUser } from "../controlers/users.controlers.js"


const router = Router()

router.get('/users', getUser);
router.get('/users/:id', getUserID);
router.post('/users', authMiddleware, createUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

export default router 