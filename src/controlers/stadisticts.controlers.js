import stadisticsModels from '../models/stadistics.models.js';

export const getAlldata = async (req, res) => {
    const year = req.params.year || req.query.year;
    console.log('AÑO RECIBIDO EN BACKEND:', year);
    try {
        const result = await stadisticsModels.getAll(year);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron datos para el año especificado.' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error al obtener resumen de pagos:', error);
        res.status(500).json({ error: 'Error al obtener resumen de pagos' });
    }
};

export const getdataById = async (req, res) => {
    const { id } = req.params; 
    const { year } = req.params;
    try {
        const result = await stadisticsModels.getById(id, year);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener resumen de pagos:', error);
        res.status(500).json({ error: 'Error al obtener resumen de pagos' });
    }
};

export const getPagosData = async (req, res) => {
    const { year } = req.query;
    try {
        const result = await stadisticsModels.getPagos(year);
        res.json(result);
    } catch (error) {
        console.error('Error al obtener pagos:', error);
        res.status(500).json({ error: 'Error al obtener pagos' });
    }
};

