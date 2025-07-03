import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY 

export function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log('Token recibido en authMiddleware:', token);
    if (!token) return res.status(401).json({ mensaje: "Token no proporcionado" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 
        next();
    } catch (err) {
        console.log('Error al verificar token:', err);
        return res.status(401).json({ mensaje: "Token inválido" });
    }
}

export function authorizeRoles(...roles) {
    return (req, res, next) => {
        console.log('req.user en authorizeRoles:', req.user);
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            return res.status(403).json({ mensaje: "No tienes permisos para acceder a este componente" });
        }
        next();
    };
}