import prisma from "../lib/prisma.js";

const tenantsModels = {

    getAll: async () => {
        try {
            const tenants = await prisma.tenants.findMany({
                include: {
                    contracts: true
                }
            });
            return { rows: tenants };
        } catch (error) {
            console.error('Error al obtener inquilinos:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const tenant = await prisma.tenants.findUnique({
                where: { id_number: id },
                include: {
                    contracts: true
                }
            });
            return { rows: tenant ? [tenant] : [] };
        } catch (error) {
            console.error('Error al obtener el inquilino:', error);
            throw error;
        }
    },

    create: async (
        id_number,
        rif,
        full_name,
        age,
        phone,
        email,
        address,
    ) => {
        try {
            const tenant = await prisma.tenants.create({
                data: {
                    id_number,
                    rif,
                    full_name,
                    age,
                    phone,
                    email,
                    address
                }
            });
            return { rows: [tenant] };
        } catch (error) {
            console.error('Error al crear inquilino:', error.message, error.stack);
            throw error;
        }
    },

    edit: async (
        id,
        rif,
        full_name,
        age,
        phone,
        email,
        address
    ) => {
        try {
            const tenant = await prisma.tenants.update({
                where: { id_number: id },
                data: {
                    rif,
                    full_name,
                    age,
                    phone,
                    email,
                    address
                }
            });
            return { rows: [tenant] };
        } catch (error) {
            console.error('Error al editar el inquilino:', error.message, error.stack);
            throw error;
        }
    },


};

export default tenantsModels;