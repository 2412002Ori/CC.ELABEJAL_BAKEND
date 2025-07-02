import express from 'express';
import { PORT } from './config.js';
import morgan from 'morgan'
import 'dotenv/config';
import cors from 'cors';

import contractRoutes from './routes/contract.routes.js';
import requestContractRoutes from './routes/request_contracts.routes.js';
import tenantRoutes from './routes/tenants.routes.js';
import relocationRutes from './routes/relocation.rutes.js';
import paymentsRoutes from './routes/payments.routes.js';
import stadsticsRoutes from './routes/stadistics.routes.js';
import userRoutes from './routes/users.routes.js';
import inventoriesRoutes from './routes/inventories.routes.js';
import inventoryRoutes from './routes/inventory.routes.js';
import loginRoutes from  './routes/login.routes.js';

import errorHandler  from './middlewares/ErrorHandler.js';

const app = express();
app.use(cors());

app.use(morgan('dev'));
app.use(express.json()); 

//rutas oriana 
app.use('/api', paymentsRoutes);
app.use('/api', stadsticsRoutes);
app.use('/api', contractRoutes); 
app.use('/api', requestContractRoutes);
app.use('/api', tenantRoutes);
app.use('/api', relocationRutes);

// rutas cesar
app.use('/api', userRoutes);
app.use('/api', inventoriesRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', loginRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto', PORT);
});