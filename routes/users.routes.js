import { Router } from "express"
import { getUserID, getUser, createUser, deleteUser, updateUser } from "../controlers/users.controlers.js"


const router = Router()

router.get('/users', getUser);

router.get('/users/:id', getUserID);

router.post('/users', createUser);

router.delete('/users/:id', deleteUser);

router.put('/users/:id', updateUser);

export default router 