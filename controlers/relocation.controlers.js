import pool from "../src/db.js";

export const getAllRelocation = async (req , res) => {
    try {
        const result = await pool.query('SELECT * FROM transfers');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ error: 'Error al obtener contratos' });
    }
};

export const getRelocationById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM transfers WHERE id_number = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener contrato:', error);
        res.status(500).json({ error: 'Error al obtener contrato' });
    }
};

export const postRelocation = async (req, res) => {
    const {
        
        reason,
        transfer_date,
        id_number,
        old_contract,
        new_contract
        
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO transfers (
                
                reason,
                transfer_date,
                id_number,
                old_contract,
                new_contract

            ) VALUES (
                $1, $2, $3, $4 , $5
            ) RETURNING *`,
            [
                reason,
                transfer_date ,
                id_number,
                old_contract,
                new_contract
                
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear contrato:', error.message, error.stack);
         res.status(500).json({ error: 'Error al crear contrato', details: error.message });
    }
};

export const  putRelocationById = async (req, res) => {
    const { id } = req.params;
    const {
        reason,
        transfer_date,
        id_number,
        old_contract,
        new_contract,
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE transfers
             SET 
             reason = $1,
             transfer_date = $2,
             old_contract = $3,
             new_contract = $4
             WHERE id_number = $5
             RETURNING *`,

            [reason,
            transfer_date ,
            old_contract,
            new_contract, id]
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
