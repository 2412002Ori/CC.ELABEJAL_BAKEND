import { Router } from "express"
import userValidate from "../middlewares/userValidate.middleware.js"
import { createUserSchema, updateUserSchema } from "../schemas/schemaZodErrors.js";
import { getUsers, getUsersID, createUser, deleteUser, updateUser } from "../controlers/users.controlers.js"

import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js"

const router = Router()

router.get('/users', getUsers);

router.get('/users/:id', getUsersID);

router.post('/users', userValidate(createUserSchema), createUser);

router.delete('/users/:id', deleteUser);

router.put('/users/:id', userValidate(updateUserSchema), updateUser);

export default router 