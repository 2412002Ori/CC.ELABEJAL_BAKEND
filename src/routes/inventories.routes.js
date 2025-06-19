import { Router } from "express"
import itemValidate from "../middlewares/inventoriesValidate.middleware.js";
import { createItemSchema, updateItemSchema } from "../schemas/schemaZodErrors.js";
import { getItems, getItemID, createItem, updateItem, deleteItem } from "../controlers/inventories.controlers.js"

const router = Router()

router.get('/items', getItems);

router.get('/items/:id', getItemID);

router.post('/items', itemValidate(createItemSchema), createItem);

router.delete('/items/:id', deleteItem);

router.put('/items/:id', itemValidate(updateItemSchema), updateItem);

export default router 