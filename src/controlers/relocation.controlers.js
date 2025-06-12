import relocationModels from '../models/relocation.models.js';

export const getAllRelocation = async (req , res) => {
    try {
        const result = await relocationModels.getAll();
        res.json(result);
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ error: 'Error al obtener contratos' });
    }
};

export const getRelocationById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await relocationModels.getById(id);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener contrato:', error);
        res.status(500).json({ error: 'Error al obtener contrato' });
    }
};

export const postRelocation = async (req, res) => {
    const {
        
        reason,
        transfer_date,
        id_number,
        old_contract,
        new_contract
        
    } = req.body;

    try {
        const result = await relocationModels.create(
            reason,
            transfer_date,
            id_number,
            old_contract,
            new_contract
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear contrato:', error.message, error.stack);
         res.status(500).json({ error: 'Error al crear contrato', details: error.message });
    }
};

export const  putRelocationById = async (req, res) => {
    const { id } = req.params;
    const {
        reason,
        transfer_date,
        id_number,
        old_contract,
        new_contract,
    } = req.body;

    try {
        const result = await relocationModels.edit(
            id,
            reason,
            transfer_date,
            id_number,
            old_contract,
            new_contract
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Solicitud de contrato no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar solicitud de contrato:', error);
        res.status(500).json({ error: 'Error 500' });
    }
};
