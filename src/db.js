import { Pool } from 'pg';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from './config.js';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log('📦 Conexión a PostgreSQL exitosa'))
  //.catch(err => console.error('❌ Error al conectar a PostgreSQL', err));

  export default pool;



  
