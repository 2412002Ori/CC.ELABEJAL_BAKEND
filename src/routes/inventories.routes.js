import { Router } from "express"
import { getItem, getItemID, createItem, deleteItem, updateItem } from "../controlers/inventories.controlers.js"

const router = Router()

router.get('/items', getItem);

router.get('/items/:id', getItemID);

router.post('/items', createItem);

router.delete('/items/:id', deleteItem);

router.put('/items/:id', updateItem);

export default router 