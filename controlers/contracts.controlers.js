import pool from "../src/db.js";

export const getAllContracts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contracts');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ error: 'Error al obtener contratos' });
    }
};

export const getContractById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM contracts WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener contrato:', error);
        res.status(500).json({ error: 'Error al obtener contrato' });
    }
};