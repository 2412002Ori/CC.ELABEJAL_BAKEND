import express from 'express';
import { PORT } from './config.js';
import contractRoutes from '../routes/contract.routes.js';
import requestContractRoutes from '../routes/request_contracts.routes.js';
import tenantRoutes from '../routes/tenants.routes.js';
import relocationRutes from '../routes/relocation.rutes.js';
import paymentsRoutes from '../routes/payments.routes.js';
import stadsticsRoutes from '../routes/stadistics.routes.js';

const app = express();

app.use(express.json()); 

app.use('/api', contractRoutes); 
app.use('/api', requestContractRoutes);
app.use('/api', tenantRoutes);
app.use('/api', relocationRutes);
app.use('/api', paymentsRoutes);
app.use('/api', stadsticsRoutes);

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto', PORT);
});