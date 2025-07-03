const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  const payments = [
    { tenant_id: 1, amount: 1000, payment_date: new Date('2025-01-15'), page_month: 'Enero', page_year: 2025 },
    { tenant_id: 2, amount: 1200, payment_date: new Date('2025-02-10'), page_month: 'Febrero', page_year: 2025 },
    { tenant_id: 1, amount: 1000, payment_date: new Date('2025-03-12'), page_month: 'Marzo', page_year: 2025 },
  ];
  await prisma.payments.createMany({ data: payments });
  console.log('Pagos 2025 insertados');
  await prisma.$disconnect();
  // Autodestruir el script
  const thisFile = path.resolve(__filename);
  fs.unlinkSync(thisFile);
  console.log('Script autodestruido.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}); 