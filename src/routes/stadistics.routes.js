import { Router } from "express";
import { getAlldata, getdataById, getPagosData } from "../controlers/stadisticts.controlers.js";  
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js";
import stadisticsModels from '../models/stadistics.models.js';

const router = Router();

router.get("/stadistics/:year", authMiddleware, authorizeRoles(1, 2), getAlldata);
router.get("/stadistics/:id/:year", authMiddleware, authorizeRoles(1, 2), getdataById);
router.get("/stadistics/pagos", authMiddleware, authorizeRoles(1, 2), getPagosData);
router.get("/stadistics", authMiddleware, authorizeRoles(1, 2), getAlldata);
router.get("/stadistics/monthly", authMiddleware, authorizeRoles(1, 2), async (req, res) => {
  const { year } = req.query;
  try {
    const result = await stadisticsModels.getMonthlyStats(year);
    res.json(result);
  } catch (error) {
    console.error('Error al obtener estadísticas mensuales:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas mensuales' });
  }
});

export default router;