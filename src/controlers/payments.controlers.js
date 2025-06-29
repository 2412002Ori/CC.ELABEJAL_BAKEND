import paymentModel from '../models/payments.models.js';
import { paymentSchema, validateUniquePayment } from '../schemas/payments_schemas.js';

export const getAllPayments = async (req , res) => {

    try {
        const result = await paymentModel.getAll();

        res.json(result);
    } catch (error) {
        console.error('Error al obtener pago:', error);
        res.status(500).json({ error: 'Error al obtener pagos' });
    }
};

export const getPaymentsById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await paymentModel.getById(id);
         console.log("Resultado de la consulta:", result);

        if ( ! result || result.length === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error al obtener pago:', error);
        res.status(500).json({ error: 'Error al obtener pago' });
    }
};

export const postPayment = async (req, res , next ) => {
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
        await paymentSchema.parseAsync(req.body);
        await validateUniquePayment(req.body);
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
    } catch (err) {
        console.error("Error en postPayment:", err);
       next(err);
    }
};


export const patchPaymentsById = async (req, res, next) => {
    const { id } = req.params;
    const patchSchema = paymentSchema.partial();

    try {

        await patchSchema.parseAsync(req.body);
        const fieldsToUpdate = {};
        for (const key of Object.keys(req.body)) {
            if (req.body[key] !== undefined) {
                fieldsToUpdate[key] = req.body[key];
            }
        }

        const result = await paymentModel.edit(id, fieldsToUpdate);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

export const deletepaymentsById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await paymentModel.deletepayment(id);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.json({ message: 'Pago eliminado', deleted: result.rows[0] });
    } catch (error) {
        console.error('Error al eliminar pago:', error);
        res.status(500).json({ error: 'Error al eliminar pago' });
    }
};