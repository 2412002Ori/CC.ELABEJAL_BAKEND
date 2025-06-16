import paymentModel from '../models/payments.models.js';

export const getAllPayments = async (req , res) => {

    try {
        const result = await paymentModel.getAll();

        res.json(result);
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ error: 'Error al obtener contratos' });
    }
};

export const getPaymentsById = async (req, res) => {
    const { id } = req;
    try {
        const result = await paymentModel.getById(id);
         console.log("Resultado de la consulta:", result);

        if ( ! result || result.length === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.json(result[0]);
    } catch (error) {
        console.error('Error al obtener contrato:', error);
        res.status(500).json({ error: 'Error al obtener contrato' });
    }
};

export const postPayment = async (req, res) => {
    const {

		amount,
		payment_date,
		created_at,
		updated_at,
		page_month,
		year_payment,
        description,
        contract_number
        
    } = req.body;

    try {
        const result = await paymentModel.create(
        
        amount,     
        payment_date,
        created_at,
        updated_at,
        page_month,
        year_payment,
        description,
        contract_number
        );
        res.status(201).json(result);
    } catch (error) {
        console.error('Error al crear contrato:', error.message, error.stack);
         res.status(500).json({ error: 'Error al crear contrato', details: error.message });
    }
};


export const patchPaymentsById = async (req) => {
    const { id } = req.params;
    const {
        amount,
        updated_at,
        page_month,
        year_payment,
        description
    } = req.body;

    try {
        const result = await paymentModel.edit(
            id,
            amount,
            updated_at,
            page_month,
            year_payment,
            description
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar pago:', error);
        res.status(500).json({ error: 'Error al actualizar pago' });
    }
};

export const deletepaymentsById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await paymentModel.deletepayment(id);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Solicitud de contrato no encontrada' });
        }
        res.json({ message: ' pago eliminado eliminada', deleted: result.rows[0] });
    } catch (error) {
        console.error('Error al eliminar solicitud de contrato:', error);
        res.status(500).json({ error: 'Error al eliminar solicitud de contrato' });
    }
};