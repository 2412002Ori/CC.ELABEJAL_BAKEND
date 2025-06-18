import requestCmodel from '../models/request.models.js';
import { validateRequestContracts } from '../schemas/contracts_R_schemas.js';
import { validateUpdateRequestContracts } from '../schemas/contracts_R_schemas.js';


export const getAllRcontracts = async ( req , res) => {
    try {
        const result = await requestCmodel.getAll();
        res.json(result);
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ error: 'Error al obtener contratos' });
    }
};

export const getRcontractById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await requestCmodel.getById(id);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener contrato:', error);
        res.status(500).json({ error: 'Error al obtener contrato' });
    }
};


export const postRcontract = async (req, res , next ) => {
    const {
        id_number,
        full_name,
        request_date,
        activity,
        phone,
        email,
    } = req.body;

    try {
        validateRequestContracts(req.body);
        const result = await requestCmodel.create(
            id_number,
            full_name,
            request_date,
            activity,
            phone,
            email
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);

        console.error('Error controlers', error);

    }
};

export const putRcontractById = async (req, res, next) => {
    const { id } = req.params;
    const {
        full_name,
        request_date,
        activity,
        phone,
        email
    } = req.body;

    try {
        validateUpdateRequestContracts(req.body);
        const result = await requestCmodel.edit(
            id,
            full_name,
            request_date,
            activity,
            phone,
            email
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: ' número de contrato no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

export const DeleteRcontractById = async (req , res) => {
    const { id } = req.params;
    try {

        const result = await requestCmodel.deleteRequest(id);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Solicitud de contrato no encontrada' });
        }
        res.json({ message: 'Solicitud de contrato eliminada', deleted: result.rows[0] });
    } catch (error) {
        console.error('Error al eliminar solicitud de contrato:', error);
        res.status(500).json({ error: 'Error al eliminar solicitud de contrato' });
    }
};