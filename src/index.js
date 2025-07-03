import 'dotenv/config';
import express from 'express';
import { PORT } from './config.js';
import morgan from 'morgan'

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
import locationsRoutes from './routes/locations.routes.js';
import finesRoutes from './routes/fines.routes.js';
import pruebasRoutes from './routes/pruebas.routes.js';

import cors from 'cors';
const app = express();

// Middleware global para desactivar caché
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors()); 

//rutas oriana 
app.use('/api', paymentsRoutes);
app.use('/api', stadsticsRoutes);
app.use('/api', contractRoutes); 
app.use('/api', requestContractRoutes);
app.use('/api', tenantRoutes);
app.use('/api', relocationRutes);
app.use('/api', finesRoutes);

// rutas cesar
app.use('/api', userRoutes);
app.use('/api', inventoriesRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', loginRoutes);
app.use('/api', locationsRoutes);
app.use('/api', pruebasRoutes);



app.use(errorHandler);

app.listen(PORT, () => {
  console.clear();
  console.log('Servidor escuchando en el puerto', PORT);
});