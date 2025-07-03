import { Router } from "express";
import stadisticsModels from '../models/stadistics.models.js';

const router = Router();

// Endpoint temporal para pruebas
router.get("/pruebas/pagos/:year", async (req, res) => {
  const { year } = req.params;
  try {
    const result = await stadisticsModels.getPagos(year);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pagos para pruebas' });
  }
});

export default router; 