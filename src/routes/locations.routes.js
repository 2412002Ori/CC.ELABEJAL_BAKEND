import { Router } from "express"
import { 
  getAllLocations, 
  getLocationById
} from "../controlers/locations.controlers.js"

const router = Router()

// Obtener todos los locales
router.get('/locations', getAllLocations)

// Obtener local por ID
router.get('/locations/:id', getLocationById)

export default router 