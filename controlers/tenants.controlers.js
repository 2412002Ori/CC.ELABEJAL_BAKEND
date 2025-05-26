import pool from "../src/db.js";


export const getTenants = async (req , res) => {
    try {
        const result = await pool.query('SELECT * FROM tenants ');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ error: 'Error al obtener contratos' });
    }
};

export const getTenantById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM tenants WHERE id_number = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener contrato:', error);
        res.status(500).json({ error: 'Error al obtener contrato' });
    }
};


export const  postTenants = async (req, res) => {
    const {
        id_number,
        full_name,
        age,
        phone,
        email,
        address,
    } = req.body;

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
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear solicitud de contrato:', error);
        res.status(500).json({ error: 'Error al crear solicitud de contrato' });
    }
};

export const  putTenantById = async (req, res) => {
    const { id } = req.params;
    const {
        full_name,
        age,
        phone,
        email,
        address
    } = req.body;

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

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Solicitud de contrato no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar solicitud de contrato:', error);
        res.status(500).json({ error: 'Error al actualizar solicitud de contrato' });
    }
};
