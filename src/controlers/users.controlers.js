import pool from "../db.js"
import { UsersModel } from "../models/users.models.js";

export const getUser = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM users')
    console.log(rows);
    res.json(rows);
}

export const getUserID = async (req, res) => { //para que funcione el await, la funcion que lo contenga tiene que ser async
    const {id} = req.params;
    const {rows} = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({message: 'Usuario no encontrado'});
    }

    res.json(rows[0]);
}

export async function createUser(req, res) {
    try {
        const user = await UsersModel.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.log('Error al crear el usuario:', error);

        if (error?.code === "23505" && error?.constraint === 'users_pkey'){
            return res.status(409).json({message: 'Error, Ya existe la llave primaria'});
        } 

        if (error?.code === "23505" && error?.constraint === 'users_username_key'){
            return res.status(409).json({message: 'Error, Ya existe este username'});
        } 

        res.status(500).json({message: 'Error al crear el usuario'});
    }
}

export async function updateUser(req, res) {
    const id = req.params.id;
    try {
        const user = await UsersModel.updateUser(id, req.body);
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.log('Error al actualizar el usuario:', error);

        if (error?.code === "23505" && error?.constraint === 'users_username_key'){
            return res.status(409).json({message: 'Error, Ya existe este username'});
        } 

        res.status(500).json({message: 'Error al actualizar el usuario'});
    }
}

export async function deleteUser(req, res) {
    const id = req.params.id;
    const data_usuario = req.body

    const {rowCount} = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);

    if (rowCount === 0) {
        return res.status(404).json({message: 'Usuario no encontrado'});
    }

    return res.json({
        User: {
            message: 'Usuario eliminado correctamente',
            user_id: id,
            username: data_usuario.username,
            email: data_usuario.email,
            password: data_usuario.password,
            role_id: data_usuario.role_id,
            created_at: data_usuario.created_at,
            updated_at: data_usuario.updated_at,
            status: data_usuario.status,
            name: data_usuario.name,
            lastname: data_usuario.lastname
        }
    });
}

