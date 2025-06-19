import { Router } from "express"
import itemValidate from "../middlewares/inventoriesValidate.middleware.js";
import { createItemSchema, updateItemSchema } from "../schemas/schemaZodErrors.js";
import { getItems, getItemID, createItem, updateItem, deleteItem } from "../controlers/inventories.controlers.js"
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js"

const router = Router()

router.get('/items', authMiddleware, authorizeRoles(1, 2), getItems);

router.get('/items/:id', authMiddleware, authorizeRoles(1, 2), getItemID);

router.post('/items', authMiddleware, authorizeRoles(1), itemValidate(createItemSchema), createItem);

router.delete('/items/:id', authMiddleware, authorizeRoles(1), deleteItem);

router.put('/items/:id', authMiddleware, authorizeRoles(1), itemValidate(updateItemSchema), updateItem);

export default router;
