// import { Pool } from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();
// import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from './config.js'

// const pool = new Pool({
//   user: DB_USER,
//   host: DB_HOST,
//   password: DB_PASSWORD,
//   database: DB_DATABASE,
//   port: DB_PORT,
// });

// pool.connect()
//   .then(() => console.log('📦 Conexión a PostgreSQL exitosa'))
//   //.catch(err => console.error('❌ Error al conectar a PostgreSQL', err));

// export default pool;

import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();;

// Cargar variables de entorno ANTES de acceder a ellas
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT), // asegúrate que el puerto sea número
});

pool.connect()
  .then(() => console.log('📦 Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('❌ Error al conectar a PostgreSQL', err));

export default pool;