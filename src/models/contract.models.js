import prisma from '../lib/prisma.js';

const ContractModel = {
    
    getAll: async () => {
        try {
            const contracts = await prisma.contracts.findMany({
                include: {
                    users: true,
                    tenants: true,
                    locations: {
                        include: {
                            areas: true
                        }
                    }
                }
            });
            return contracts;
        } catch (error) {
            console.error('Error al obtener contratos:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const contract = await prisma.contracts.findUnique({
                where: { contract_number: id },
                include: {
                    users: true,
                    tenants: true,
                    locations: {
                        include: {
                            areas: true
                        }
                    }
                }
            });
            return contract ? [contract] : [];
        } catch (error) {
            console.error('Error al obtener contrato:', error);
            throw error;
        }
    },

    create: async (
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
    ) => {
        try {
            const contract = await prisma.contracts.create({
                data: {
                    registered_user: registered_user ? parseInt(registered_user) : null,
                    contract_number,
                    id_number,
                    location_id: location_id ? parseInt(location_id) : null,
                    rent_amount: rent_amount ? parseFloat(rent_amount) : null,
                    activity,
                    duration_description,
                    init_date: init_date ? new Date(init_date) : null,
                    end_date: end_date ? new Date(end_date) : null,
                    business_name,
                    entry_time: entry_time ? new Date(`1970-01-01T${entry_time}`) : null,
                    exit_time: exit_time ? new Date(`1970-01-01T${exit_time}`) : null,
                    daysWork: typeof daysWork === 'string' ? JSON.parse(daysWork) : daysWork
                }
            });
            return contract;
        } catch (error) {
            console.error('Error al crear contrato:', error.message, error.stack);
            throw error;
        }
    },

    update: async (contract_number, data) => {
        try {
            const contract = await prisma.contracts.update({
                where: { contract_number },
                data: {
                    registered_user: data.registered_user ? parseInt(data.registered_user) : null,
                    id_number: data.id_number,
                    location_id: data.location_id ? parseInt(data.location_id) : null,
                    rent_amount: data.rent_amount ? parseFloat(data.rent_amount) : null,
                    activity: data.activity,
                    duration_description: data.duration_description,
                    init_date: data.init_date ? new Date(data.init_date) : null,
                    end_date: data.end_date ? new Date(data.end_date) : null,
                    business_name: data.business_name,
                    entry_time: data.entry_time ? new Date(`1970-01-01T${data.entry_time}`) : null,
                    exit_time: data.exit_time ? new Date(`1970-01-01T${data.exit_time}`) : null,
                    daysWork: data.daysWork ? (typeof data.daysWork === 'string' ? JSON.parse(data.daysWork) : data.daysWork) : null
                }
            });
            return contract;
        } catch (error) {
            console.error('Error al actualizar contrato:', error.message, error.stack);
            throw error;
        }
    },

    delete: async (contract_number) => {
        try {
            const contract = await prisma.contracts.delete({
                where: { contract_number }
            });
            return contract;
        } catch (error) {
            console.error('Error al eliminar contrato:', error.message, error.stack);
            throw error;
        }
    }
};

export default ContractModel;