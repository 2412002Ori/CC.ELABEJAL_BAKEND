import express from 'express';
import { PORT } from './config.js';
import contractRoutes from '../routes/contract.routes.js';
import requestContractRoutes from '../routes/request_contracts.routes.js';
import tenantRoutes from '../routes/tenants.routes.js';
import relocationRutes from '../routes/relocation.rutes.js';

const app = express();

app.use(express.json()); 

app.use('/api', contractRoutes); 
app.use('/api', requestContractRoutes);
app.use('/api', tenantRoutes);
app.use('/api', relocationRutes);

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto', PORT);
});