import jwt from 'jsonwebtoken';

const SECRET_KEY = 'C41'; // Usa variable de entorno

export function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
}