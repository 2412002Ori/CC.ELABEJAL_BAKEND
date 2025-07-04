import ContractModel from '../models/contract.models.js';
import { validateContracts } from '../schemas/contracts_schemas.js';

export const getAllContracts = async (req , res) => {
    try {
       
        const result = await ContractModel.getAll();

        res.json(result);
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ error: 'Error al obtener contratos' });
    }
};

export const getContractById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ContractModel.getById(id);
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

export const postContract = async ( req, res, next) => {
    const {
        registered_user,
        contract_number,
        id_number,
        location_id,
        rent_amount,
        activity,
        duration_description,
        init_date,
        end_date,
        business_name,
        entry_time,
        exit_time,
        daysWork

    } = req.body;


    try {
        await validateContracts(req.body);
        const result = await ContractModel.create(
            registered_user,
            contract_number,
            id_number,
            location_id,
            rent_amount,
            activity,
            duration_description,
            init_date,
            end_date,
            business_name,
            entry_time,
            exit_time,
            daysWork
        );
        console.log('Resultado de la inserción:', result);
        res.status(201).json(result);
        
    } catch (err) {
        next(err);
    }
};

