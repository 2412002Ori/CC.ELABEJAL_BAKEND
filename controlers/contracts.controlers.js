import pool from "../src/db.js";

export const getAllContracts = async (req , res) => {
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
        const result = await pool.query('SELECT * FROM contracts WHERE contract_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener contrato:', error);
        res.status(500).json({ error: 'Error al obtener contrato' });
    }
};

export const postContract = async ( req, res) => {
    const {
        registered_user,
        contract_number,
        id_number,
        location_id,
        rent_amount,
        activity,
        duration_description,
        init_date,
        end_date,
        business_name,
        entry_time,
        exit_time,
        daysWork

    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO contracts (
                registered_user, contract_number, id_number, location_id, rent_amount, activity, duration_description,
                init_date, end_date, business_name, entry_time, exit_time, "daysWork"
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
            ) RETURNING *`,
            [
                registered_user,
                contract_number,
                id_number,
                location_id,
                rent_amount,
                activity,
                duration_description,
                init_date,
                end_date,
                business_name,
                entry_time,
                exit_time,
                daysWork
                
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear contrato:', error.message, error.stack);
         res.status(500).json({ error: 'Error al crear contrato', details: error.message });
    }
};

