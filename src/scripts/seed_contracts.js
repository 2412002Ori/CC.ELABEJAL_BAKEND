import prisma from '../lib/prisma.js';

async function main() {
  try {
    // Contratos de prueba (ajusta los valores según los datos existentes en tu BD)
    const contratos = [
      {
        contract_number: 'C-1001',
        id_number: '21416797', // Debe existir en tenants
        location_id: 1,        // Debe existir en locations
        rent_amount: 1000.00,
        business_name: 'Negocio A',
      },
      {
        contract_number: 'C-1002',
        id_number: '2808551',
        location_id: 2,
        rent_amount: 1200.00,
        business_name: 'Negocio B',
      },
      {
        contract_number: 'C-1003',
        id_number: '28457689',
        location_id: 3,
        rent_amount: 900.00,
        business_name: 'Negocio C',
      },
    ];

    for (const data of contratos) {
      await prisma.contracts.create({ data });
    }
    console.log('Contratos insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar contratos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 