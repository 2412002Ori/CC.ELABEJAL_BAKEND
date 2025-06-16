import pool from '../db.js';

const ContractModel = {
    
    getAll: async () => {
        try {
            const result = await pool.query('SELECT * FROM contracts');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener contratos:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM contracts WHERE contract_number = $1', [id]);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener contrato:', error);
            throw error;
        }
    },

    create: async (
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
    ) => {
        try {
            const result = await pool.query(
                `INSERT INTO contracts (
                    registered_user, contract_number, id_number, location_id, rent_amount, activity, duration_description,
                    init_date, end_date, business_name, entry_time, exit_time, "daysWork"
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb
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
            return result.rows[0];
        } catch (error) {
            console.error('Error al crear contrato:', error.message, error.stack);
            throw error;
        }
    }
};

export default ContractModel;