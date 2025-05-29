import pool from '../src/db.js';

const requestCmodel = {

    getAll: async () => {
        try {
            const result = await pool.query('SELECT * FROM contract_requests');
            return result;
        } catch (error) {
            console.error('Error al obtener pagos:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM contract_requests WHERE id_number = $1', [id]);
            return result;
        } catch (error) {
            console.error('Error al obtener solicitud:', error);
            throw error;
        }
    },

   create: async (

        id_number,
        full_name,
        request_date,
        activity,
        phone,
        email,
        
    ) => {
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
            return result;
        } catch (error) {
            console.error('Error al crear solicitud:', error.message, error.stack);
            throw error;
        }
    },

    edit: async (
        id,
        full_name,
        request_date,
        activity,
        phone,
        email
    ) => {
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

            return result;
        } catch (error) {
            console.error('Error al crear solicitud:', error.message, error.stack);
            throw error;
        }
    },

    deleteRequest: async (id) => {
    try {
        const result = await pool.query('DELETE FROM contract_requests WHERE request_id = $1 RETURNING *', [id]);
        return result;
    } catch (error) {
        console.error('Error al eliminar solicitud :', error);
        throw error;
    }
},

};

export default requestCmodel;