import { Router } from "express"
import userValidate from "../middlewares/userValidate.middleware.js"
import { createUserSchema, updateUserSchema } from "../schemas/schemaZodErrors.js";
import { getUsers, getUsersID, createUser, deleteUser, updateUser } from "../controlers/users.controlers.js"
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js"

const router = Router()

router.get('/users', authMiddleware, authorizeRoles(1, 2), getUsers);

router.get('/users/:id', authMiddleware, authorizeRoles(1, 2), getUsersID);

router.post('/users', authMiddleware, authorizeRoles(1), userValidate(createUserSchema), createUser);

router.delete('/users/:id', authMiddleware, authorizeRoles(1), deleteUser);

router.put('/users/:id', authMiddleware, authorizeRoles(1), userValidate(updateUserSchema), updateUser);

export default router;