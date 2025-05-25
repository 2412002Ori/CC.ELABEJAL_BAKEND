import express from 'express';
import { PORT } from './config.js';
import contractRoutes from '../routes/contract.routes.js';

const app = express();

app.use(express.json()); 

app.use('/api', contractRoutes); 

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto', PORT);
});