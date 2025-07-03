import tenantsModels from '../models/tenants.models.js';
import { validateTenant } from '../schemas/tenants_shemas.js';


export const getTenants = async (req , res) => {
    try {
        const result = await tenantsModels.getAll();
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ error: 'Error al obtener contratos' });
    }
};

export const getTenantById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await tenantsModels.getById(id);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener el inquilino', error);
        res.status(500).json({ error: 'Error 500' });
    }
};


export const  postTenants = async (req, res, next) => {
    const {
        id_number,
        rif,
        full_name,
        age,
        phone,
        email,
        address,
    } = req.body;

    try {
      await validateTenant(req.body); 

        const result = await tenantsModels.create(
            id_number,
            rif,
            full_name,
            age,
            phone,
            email,
            address
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
        console.error('Error al crear solicitud de inquilino:', err);
        res.status(500).json({ error: ' ya existe ese inquilino' });
    }
};

export const  putTenantById = async (req, res) => {
    const { id } = req.params;
    const {
        rif,
        full_name,
        age,
        phone,
        email,
        address
    } = req.body;

    try {
        const result = await tenantsModels.edit(
            id,
            rif,
            full_name,
            age,
            phone,
            email,
            address
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


