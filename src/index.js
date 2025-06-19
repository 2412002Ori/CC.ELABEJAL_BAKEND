import express from 'express';
import { PORT } from './config.js';
import morgan from 'morgan'

import userRoutes from './routes/users.routes.js';
import inventoriesRoutes from './routes/inventories.routes.js';
import inventoryRoutes from './routes/inventory.routes.js';
import loginRoutes from  './routes/login.routes.js';

const app = express();

app.use(express.json()); 

// rutas cesar
app.use('/api', userRoutes);
app.use('/api', inventoriesRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', loginRoutes);

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto', PORT);
});