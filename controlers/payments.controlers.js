import pool from "../src/db.js";

export const getAllPayments = async (req , res) => {
    try {
        const result = await pool.query('SELECT * FROM payments');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ error: 'Error al obtener contratos' });
    }
};

export const getPaymentsById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM payments WHERE contract_number = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener contrato:', error);
        res.status(500).json({ error: 'Error al obtener contrato' });
    }
};

export const postPayments = async (req, res) => {
    const {

       contract_id,
		amount,
		payment_date,
		created_at,
		updated_at,
		page_month,
		year_payment,
        description
        
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO payments (
                
               contract_id,
		        amount,
		        payment_date,
		        created_at,
		        updated_at,
		        page_month,
		        year_payment,
                description

            ) VALUES (
                $1, $2, $3, $4 , $5 , $6, $7 , $8
            ) RETURNING *`,
            [
                contract_id,
		        amount,
		        payment_date,
		        created_at,
		        updated_at,
		        page_month,
		        year_payment,
                description
                
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear contrato:', error.message, error.stack);
         res.status(500).json({ error: 'Error al crear contrato', details: error.message });
    }
};

export const patchPaymentsById = async (req, res) => {
    const { id } = req.params;
    const {
        amount,
        page_month,
        year_payment,
        description
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE payments
             SET 
                amount = $1,
                page_month = $2,
                year_payment = $3,
                description = $4
             WHERE payment_id = $5
             RETURNING *`,
            [ amount, page_month, year_payment, description, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        res.json(result.rows);
    } catch (error) {
        console.error('Error al actualizar pago:', error);
        res.status(500).json({ error: 'Error al actualizar pago' });
    }
};
