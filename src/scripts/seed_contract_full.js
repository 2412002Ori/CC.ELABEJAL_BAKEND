import prisma from '../lib/prisma.js';

async function main() {
  try {
    const contract = await prisma.contracts.create({
      data: {
        contract_number: 'C-2001',
        id_number: '21416797', // Debe existir en tenants
        location_id: 1,        // Debe existir en locations
        rent_amount: 1500.00,
        business_name: 'Negocio Completo',
        activity: 'Venta de productos',
        duration_description: '12 meses',
        init_date: new Date('2025-07-02'),
        end_date: new Date('2026-07-01'),
        entry_time: new Date('1970-01-01T08:00:00'),
        exit_time: new Date('1970-01-01T18:00:00'),
        daysWork: { lunes: true, martes: true, miercoles: true, jueves: true, viernes: true, sabado: false, domingo: false }
      }
    });
    console.log('Contrato insertado correctamente:', contract);
  } catch (error) {
    console.error('Error al insertar contrato:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 