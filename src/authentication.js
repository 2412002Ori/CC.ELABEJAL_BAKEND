import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY  
if (!SECRET_KEY) {
  throw new Error('SECRET_KEY no está definido en las variables de entorno. Por favor, configúralo en Render o en un archivo .env');
}

export function generarToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

// export default function verificarToken(token) {
//     try {
//         return jwt.verify(token, SECRET_KEY);
//     } catch (err) {
//         return null;
//     }
// }

