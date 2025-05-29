import { Router } from "express"
import { getUser, createUser, deleteUser, updateUser } from "../controlers/users.controlers.js"


const router = Router()

router.get('/users', getUser);

router.get('/users/:id', getUser);

router.post('/users', createUser);

router.delete('/users/:id', deleteUser);

router.put('/users/:id_user', updateUser);

export default router 