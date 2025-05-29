import pool from '../src/db.js';

const relocationModels = {

    getAll: async () => {
        try {
            const result = await pool.query('SELECT * FROM transfers');
            return result;
        } catch (error) {
            console.error('Error al obtener pagos:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM transfers WHERE id_number = $1', [id]);
            return result;
        } catch (error) {
            console.error('Error al obtener pago:', error);
            throw error;
        }
    },

   create: async (
       
        reason,
        transfer_date,
        id_number,
        old_contract,
        new_contract

    ) => {
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
            return result;
        } catch (error) {
            console.error('Error al crear pago:', error.message, error.stack);
            throw error;
        }
    },

    edit: async (
        id,
        reason,
        transfer_date,
        id_number,
        old_contract,
        new_contract,
    ) => {
        try {
            const result = await pool.query(
            `UPDATE transfers
             SET 
             reason = $1,
             transfer_date = $2,
             id_number = $3,
             old_contract = $4,
             new_contract = $5
             WHERE transfer_id = $6
             RETURNING *`,

            [reason,
            transfer_date ,
            id_number,
            old_contract,
            new_contract, id]
        );

            return result;
        } catch (error) {
            console.error('Error al crear pago:', error.message, error.stack);
            throw error;
        }
    }

};

export default relocationModels;