import { Pool } from 'pg';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from './config.js';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER, 
  password: DB_PASSWORD, 
  database: DB_NAME, 
  port: DB_PORT 
});

pool.connect()
  .then(() => console.log('📦 Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('❌ Error al conectar a PostgreSQL', err));

  export default pool;



  
