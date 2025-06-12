import pool from "../src/db.js";

const tenantsModels = {

    getAll: async () => {
        try {
            const result = await pool.query('SELECT * FROM tenants ');
            return result;
        } catch (error) {
            console.error('Error al obtener pagos:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM tenants WHERE id_number = $1', [id]);
            return result;
        } catch (error) {
            console.error('Error al obtener el inquilino :', error);
            throw error;
        }
    },

   create: async (
        id_number,
        full_name,
        age,
        phone,
        email,
        address,
    ) => {
        try {
            const result = await pool.query(
                `INSERT INTO tenants (
                id_number, full_name, age, phone, email, address
            ) VALUES (
                $1, $2, $3, $4, $5, $6
            ) RETURNING *`,
            [
                id_number,
                full_name,
                age,
                phone,
                email,
                address

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
        full_name,
        age,
        phone,
        email,
        address
    ) => {
        try {
            const result = await pool.query(
            `UPDATE tenants
             SET full_name = $1,
                 age = $2,
                 phone = $3,
                 email = $4,
                 address = $5
             WHERE id_number = $6
             RETURNING *`,
            [full_name, age, phone, email, address, id]
        );
            return result;
        } catch (error) {
            console.error('Error al editar el pago:', error.message, error.stack);
            throw error;
        }
    }

};

export default tenantsModels;