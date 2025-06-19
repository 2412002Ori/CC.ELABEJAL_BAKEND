import * as UsersModel from "../models/users.models.js"

export async function getUsers(req, res) {
    const users = await UsersModel.getUsers();
    res.json(users);
}

export async function getUsersID(req, res) {
    const id = req.params.id
    const user = await UsersModel.getUsersID(id);
    if (!user || user.length === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(user);
} 

export async function createUser(req, res) {
    try {
        const user = await UsersModel.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        if (error?.code === "23505" && error?.constraint === 'users_pkey'){
            return res.status(409).json({message: 'Error, Ya existe la llave primaria'});
        } //el error 409 indica conflicto

        if (error?.code === "23505" && error?.constraint === 'users_username_key'){
            return res.status(409).json({message: 'Error, Ya existe este username'});
        } //el error 409 indica conflicto

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
        console.log('Error al crear el usuario:', error);

        if (error?.code === "23505" && error?.constraint === 'users_username_key'){
            return res.status(409).json({message: 'Error, Ya existe este username'});
        } //el error 409 indica conflicto

        res.status(500).json({message: 'Error al actualizar el usuario'});
    }
}

export async function deleteUser(req, res) {
    const id = req.params.id;
    const data_usuario = req.body
    const deleted = await UsersModel.deleteUser(id);
    
    if (deleted === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    return res.json({
        User: {
            message: 'Usuario eliminado correctamente',
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

