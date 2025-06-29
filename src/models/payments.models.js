import prisma from "../lib/prisma.js";

const PaymentsModel = {

    getAll: async () => {
        try {
            const payments = await prisma.payments.findMany({
                include: {
                    contracts: {
                        include: {
                            tenants: true,
                            users: true
                        }
                    }
                }
            });
            return { rows: payments };
        } catch (error) {
            console.error('Error al obtener pagos:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const payment = await prisma.payments.findUnique({
                where: { payment_id: parseInt(id) },
                include: {
                    contracts: {
                        include: {
                            tenants: true,
                            users: true
                        }
                    }
                }
            });
            return { rows: payment ? [payment] : [] };
        } catch (error) {
            console.error('Error al obtener pago:', error);
            throw error;
        }
    },

    create: async (
        amount,
        payment_date,
        created_at,
        updated_at,
        page_month,
        year_payment,
        description,
        contract_number
    ) => {
        try {
            const payment = await prisma.payments.create({
                data: {
                    amount: amount ? parseFloat(amount) : null,
                    payment_date: payment_date ? new Date(payment_date) : new Date(),
                    created_at: created_at ? new Date(created_at) : new Date(),
                    updated_at: updated_at ? new Date(updated_at) : new Date(),
                    page_month,
                    year_payment: year_payment ? parseInt(year_payment) : null,
                    description,
                    contract_number
                },
                include: {
                    contracts: {
                        include: {
                            tenants: true,
                            users: true
                        }
                    }
                }
            });
            return { rows: [payment] };
        } catch (error) {
            console.error('Error al crear pago:', error.message, error.stack);
            throw error;
        }
    },

    edit: async (id, fieldsToUpdate) => {
        try {
            const payment = await prisma.payments.update({
                where: { payment_id: parseInt(id) },
                data: fieldsToUpdate,
                include: {
                    contracts: {
                        include: {
                            tenants: true,
                            users: true
                        }
                    }
                }
            });
            return { rows: [payment] };
        } catch (error) {
            console.error('Error al editar pago:', error.message, error.stack);
            throw error;
        }
    },

    deletepayment: async (id) => {
        try {
            console.log("Intentando eliminar pago con ID:", id);

            const payment = await prisma.payments.delete({
                where: { payment_id: parseInt(id) }
            });

            console.log("Resultado de la eliminación:", payment);
            return { rows: [payment] };
        } catch (error) {
            console.error('Error al eliminar el pago:', error.message, error.stack);
            throw error;
        }
    },

    findDuplicate: async ({ amount, payment_date, contract_number }) => {
        try {
            const payment = await prisma.payments.findFirst({
                where: {
                    amount: amount ? parseFloat(amount) : null,
                    payment_date: payment_date ? new Date(payment_date) : null,
                    contract_number
                }
            });
            return payment;
        } catch (error) {
            console.error('Error al buscar pago duplicado:', error);
            throw error;
        }
    },

    getByContract: async (contract_number) => {
        try {
            const payments = await prisma.payments.findMany({
                where: { contract_number },
                include: {
                    contracts: {
                        include: {
                            tenants: true,
                            users: true
                        }
                    }
                }
            });
            return { rows: payments };
        } catch (error) {
            console.error('Error al obtener pagos por contrato:', error);
            throw error;
        }
    }
};

export default PaymentsModel;

