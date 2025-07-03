import FinesModel from '../models/fines.models.js';

export const getAllFines = async (req, res) => {
  try {
    const result = await FinesModel.getAll();
    res.json(result);
  } catch (error) {
    console.error('Error al obtener multas:', error);
    res.status(500).json({ error: 'Error al obtener multas' });
  }
};

export const getFineById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await FinesModel.getById(id);
    if (!result) {
      return res.status(404).json({ error: 'Multa no encontrada' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error al obtener multa:', error);
    res.status(500).json({ error: 'Error al obtener multa' });
  }
};

export const postFine = async (req, res) => {
  try {
    const result = await FinesModel.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error al crear multa:', error);
    res.status(500).json({ error: 'Error al crear multa' });
  }
}; 