import pool from "../src/db.js";


export const getAllRcontracts = async (req , res) => {
    try {
        const result = await pool.query('SELECT * FROM contract_requests');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ error: 'Error al obtener contratos' });
    }
};

export const getRcontractById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM contract_requests WHERE id_number = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener contrato:', error);
        res.status(500).json({ error: 'Error al obtener contrato' });
    }
};


export const postRcontract = async (req, res) => {
    const {
        id_number,
        full_name,
        request_date,
        activity,
        phone,
        email,
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO contract_requests (
                id_number, full_name, request_date, activity, phone, email
            ) VALUES (
                $1, $2, $3, $4, $5, $6
            ) RETURNING *`,
            [
                id_number,
                full_name,
                request_date,
                activity,
                phone,
                email,

            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear solicitud de contrato:', error);
        res.status(500).json({ error: 'Error al crear solicitud de contrato' });
    }
};

export const putRcontractById = async (req, res) => {
    const { id } = req.params;
    const {
        full_name,
        request_date,
        activity,
        phone,
        email
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE contract_requests
             SET full_name = $1,
                 request_date = $2,
                 activity = $3,
                 phone = $4,
                 email = $5
             WHERE id_number = $6
             RETURNING *`,
            [full_name, request_date, activity, phone, email, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Solicitud de contrato no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar solicitud de contrato:', error);
        res.status(500).json({ error: 'Error al actualizar solicitud de contrato' });
    }
};

export const DeleteRcontractById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM contract_requests WHERE request_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Solicitud de contrato no encontrada' });
        }
        res.json({ message: 'Solicitud de contrato eliminada', deleted: result.rows[0] });
    } catch (error) {
        console.error('Error al eliminar solicitud de contrato:', error);
        res.status(500).json({ error: 'Error al eliminar solicitud de contrato' });
    }
};