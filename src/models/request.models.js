import prisma from '../lib/prisma.js';

const requestCmodel = {

    getAll: async () => {
        try {
            const requests = await prisma.contract_requests.findMany({
                orderBy: {
                    request_date: 'desc'
                }
            });
            return { rows: requests };
        } catch (error) {
            console.error('Error al obtener solicitudes:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const request = await prisma.contract_requests.findUnique({
                where: { id_number: id }
            });
            return { rows: request ? [request] : [] };
        } catch (error) {
            console.error('Error al obtener solicitud:', error);
            throw error;
        }
    },

    create: async (
        id_number,
        full_name,
        request_date,
        activity,
        phone,
        email,
    ) => {
        try {
            const request = await prisma.contract_requests.create({
                data: {
                    id_number,
                    full_name,
                    request_date: request_date ? new Date(request_date) : new Date(),
                    activity,
                    phone,
                    email
                }
            });
            return { rows: [request] };
        } catch (error) {
            console.error('Error al crear solicitud:', error.message, error.stack);
            throw error;
        }
    },

    edit: async (
        id,
        full_name,
        request_date,
        activity,
        phone,
        email
    ) => {
        try {
            const request = await prisma.contract_requests.update({
                where: { id_number: id },
                data: {
                    full_name,
                    request_date: request_date ? new Date(request_date) : null,
                    activity,
                    phone,
                    email
                }
            });
            return { rows: [request] };
        } catch (error) {
            console.error('Error al actualizar solicitud:', error.message, error.stack);
            throw error;
        }
    },

    deleteRequest: async (id) => {
        try {
            const request = await prisma.contract_requests.delete({
                where: { id_number: id }
            });
            return { rows: [request] };
        } catch (error) {
            console.error('Error al eliminar solicitud:', error);
            throw error;
        }
    }
};

export default requestCmodel;