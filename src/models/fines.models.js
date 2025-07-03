import prisma from '../lib/prisma.js';

const FinesModel = {
  getAll: async () => {
    try {
      return await prisma.fines.findMany({
        include: {
          contracts: true
        }
      });
    } catch (error) {
      console.error('Error al obtener multas:', error);
      throw error;
    }
  },

  getById: async (fine_id) => {
    try {
      return await prisma.fines.findUnique({
        where: { fine_id: Number(fine_id) },
        include: {
          contracts: true
        }
      });
    } catch (error) {
      console.error('Error al obtener multa:', error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      return await prisma.fines.create({
        data: {
          contract_id: Number(data.contract_id),
          amount: Number(data.amount),
          payment_date: data.payment_date ? new Date(data.payment_date) : null,
          reason: data.reason,
          created_at: data.created_at ? new Date(data.created_at) : new Date(),
          updated_at: data.updated_at ? new Date(data.updated_at) : new Date(),
        }
      });
    } catch (error) {
      console.error('Error al crear multa:', error);
      throw error;
    }
  },
};

export default FinesModel; 