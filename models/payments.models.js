import pool from '../src/db.js';

const paymentModel = {

    getAll: async () => {
        try {
            const result = await pool.query('SELECT * FROM payments');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener pagos:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM payments WHERE contract_number = $1', [id]);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener pago:', error);
            throw error;
        }
    },

   create: async (
       
        amount,
        payment_date,
        created_at,
        updated_at,
        page_month,
        year_payment,
        description,
        contract_number
    ) => {
        try {
            const result = await pool.query(
                `INSERT INTO payments (
                   
                    amount,
                    payment_date,
                    created_at,
                    updated_at,
                    page_month,
                    year_payment,
                    description,
                    contract_number
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7 , $8
                ) RETURNING *`,
                [
                   
                    amount,
                    payment_date,
                    created_at,
                    updated_at,
                    page_month,
                    year_payment,
                    description,
                    contract_number
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
        amount,
        updated_at,
        page_month,
        year_payment,
        description
    ) => {
        try {
            const result = await pool.query( 
                `UPDATE payments
                 SET 
                    amount = $1,
                    updated_at = $2,
                    page_month = $3,
                    year_payment = $4,
                    description = $5
                 WHERE payment_id = $6
                 RETURNING *`,
                [ amount, updated_at , page_month, year_payment, description, id]
            );
            return result;
        } catch (error) {
            console.error('Error al crear pago:', error.message, error.stack);
            throw error;
        }
    }

};

export default paymentModel;