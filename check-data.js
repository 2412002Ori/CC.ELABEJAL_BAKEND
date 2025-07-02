import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const prisma = new PrismaClient();

async function checkData() {
  console.log('🔍 Verificando datos en la base de datos...');
  console.log('📊 DATABASE_URL:', process.env.DATABASE_URL ? 'Configurado' : 'NO CONFIGURADO');
  
  try {
    // Conectar a la base de datos
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos exitosa!');
    
    // Verificar datos de contract_requests
    console.log('\n📋 === DATOS DE CONTRACT_REQUESTS ===');
    const requests = await prisma.contract_requests.findMany({
      take: 5, // Solo los primeros 5 registros
      orderBy: {
        request_id: 'desc'
      }
    });
    
    console.log(`📊 Total de solicitudes encontradas: ${requests.length}`);
    
    requests.forEach((request, index) => {
      console.log(`\n📝 Solicitud ${index + 1}:`);
      console.log(`   request_id: ${request.request_id}`);
      console.log(`   id_number: "${request.id_number}"`);
      console.log(`   full_name: "${request.full_name}"`);
      console.log(`   request_date: ${request.request_date}`);
      console.log(`   activity: "${request.activity}"`);
      console.log(`   email: "${request.email}"`);
      console.log(`   phone: "${request.phone}"`);
    });
    
    // Verificar datos de tenants
    console.log('\n👥 === DATOS DE TENANTS ===');
    const tenants = await prisma.tenants.findMany({
      take: 5,
      orderBy: {
        tenant_id: 'desc'
      }
    });
    
    console.log(`📊 Total de inquilinos encontrados: ${tenants.length}`);
    
    tenants.forEach((tenant, index) => {
      console.log(`\n👤 Inquilino ${index + 1}:`);
      console.log(`   tenant_id: ${tenant.tenant_id}`);
      console.log(`   id_number: "${tenant.id_number}"`);
      console.log(`   full_name: "${tenant.full_name}"`);
      console.log(`   age: ${tenant.age}`);
      console.log(`   phone: "${tenant.phone}"`);
      console.log(`   email: "${tenant.email}"`);
    });
    
    // Verificar si hay coincidencias entre contract_requests y tenants
    console.log('\n🔗 === VERIFICANDO COINCIDENCIAS ===');
    for (const request of requests) {
      const matchingTenant = await prisma.tenants.findUnique({
        where: { id_number: request.id_number }
      });
      
      if (matchingTenant) {
        console.log(`✅ COINCIDENCIA: Solicitud ${request.request_id} (${request.id_number}) coincide con inquilino ${matchingTenant.tenant_id} (${matchingTenant.full_name})`);
      } else {
        console.log(`❌ NO COINCIDE: Solicitud ${request.request_id} (${request.id_number}) no tiene inquilino correspondiente`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error al verificar datos:', error);
  } finally {
    await prisma.$disconnect();
    console.log('\n🏁 Verificación completada');
  }
}

// Ejecutar verificación
checkData(); 