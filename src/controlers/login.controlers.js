import * as LoginModel from "../models/login.models.js";
import { generarToken } from "../authentication.js";

export async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await LoginModel.findUserByUsername(username);

        if (!user) {
            return res.status(401).json({ mensaje: "Usuario no encontrado" });
        }
        if (user.password !== password) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        console.log('Usuario encontrado:', user);
        const token = generarToken({ id: user.user_id, username: user.username, role: user.role_id });
        res.json({ 
            mensaje: "Login exitoso",
            usuario: {
                id: user.user_id,
                username: user.username,
                role: user.role_id,
                email: user.email,
                name: user.name,
                lastname: user.lastname,
                status: user.status
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
}
