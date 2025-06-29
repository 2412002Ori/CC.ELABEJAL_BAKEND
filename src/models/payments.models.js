import pool from '../db.js';

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
            return result;
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

        edit: async (id, fieldsToUpdate) => {
        try {
            const keys = Object.keys(fieldsToUpdate);
            if (keys.length === 0) throw new Error("No fields to update");
    
            const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(', ');
            const values = keys.map(key => fieldsToUpdate[key]);
            values.push(id);
    
            const query = `UPDATE payments SET ${setClause} WHERE payment_id = $${keys.length + 1} RETURNING *`;
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            console.error('Error al editar pago:', error.message, error.stack);
            throw error;
        }
    },

 
    deletepayment: async (id) => {
        try {
            console.log("Intentando eliminar pago con ID:", id); 

            await pool.query('DELETE FROM payments WHERE payment_id = $1 RETURNING *' , [id]);

            console.log("Resultado de la eliminación:", result);

            if (result.rowCount === 0) {
                console.warn("No se encontró ningún pago con el ID:", id);
                return null; 
            }

            return result;
        } catch (error) {
            console.error('Error al eliminar el pago:', error.message, error.stack); 
            throw error;
        }
    },

    
    findDuplicate: async ({ amount, payment_date, contract_number }) => {
            try {
                const result = await pool.query(
                    `SELECT * FROM payments WHERE amount = $1 AND payment_date = $2 AND contract_number = $3`,
                    [amount, payment_date, contract_number]
                );
                return result.rows[0]; 
            } catch (error) {
                console.error('Error al buscar pago duplicado:', error);
                throw error;
            }
    }
    
}; 
export default paymentModel;

