// import { generarToken } from '../src/authentication.js';

// export function login(req, res) {
//     const { username, password } = req.body;

//     if (username === 'ejemplo' && password === '1234') {
//         const user = { id: 1, username };
//         const token = generarToken(user);
//         return res.json({ token });
//     } else {
//         return res.status(401).json({ mensaje: 'Credenciales inválidas' });
//     }
// }

import { generarToken } from '../authentication.js';
import pool from '../db.js';

export async function login(req, res) {
    const { username, password } = req.body;

    try {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }

        const user = rows[0];

        // Tengo que hashear mi contraseña antes de compararla
        if (user.password !== password) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        const token = generarToken({ id: user.user_id, username: user.username, role: user.role_id });
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}

