import pool from "../db.js"
import { validate } from "email-validator"; 

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

export const createUser = async (req, res) => { 
    try{
        const data_usuario = req.body

        if (!validate(data_usuario.email) || !data_usuario.email.endsWith("@gmail.com")) {
            return res.status(400).json({ 
                message: 'Error, el correo debe ser válido y tener dominio @gmail.com' 
            });
        }

        await pool.query('INSERT INTO users (username, email, password, role_id, created_at, updated_at, status, name, lastname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [data_usuario.username, data_usuario.email, data_usuario.password, data_usuario.role_id, data_usuario.created_at, data_usuario.updated_at, data_usuario.status, data_usuario.name, data_usuario.lastname]
        );

        res.status(201).json({
            message: 'Usuario creado correctamente',
            User: {
                username: data_usuario.username,
                email: data_usuario.email,
                role_id: data_usuario.role_id,
                created_at: data_usuario.created_at,
                updated_at: data_usuario.updated_at,
                status: data_usuario.status,
                name: data_usuario.name,
                lastname: data_usuario.lastname
            }
        });
    } catch (error) {
        console.log('Error al crear el usuario:', error);

        if (error?.code === "23505" && error?.constraint === 'users_pkey'){
            return res.status(409).json({message: 'Error, Ya existe la llave primaria'});
        } //el error 409 indica conflicto

        if (error?.code === "23505" && error?.constraint === 'users_username_key'){
            return res.status(409).json({message: 'Error, Ya existe este username'});
        } //el error 409 indica conflicto

        if (error?.code === "23503"){ //el error 23503 indica una violación de la restricción de clave foranea acuerdate
            return res.status(422).json({message: 'Error, Solo se puede ingresar en el campo role_id el valor 1 o 2'});
        } 

        res.status(500).json({message: 'Error al crear el usuario'});
    }
}

export const deleteUsers = async (req, res) => {
    const {id} = req.params
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

    // return res.sendStatus(204);
}

export const updateUser = async (req, res) => { 
    try {
        const {id} = req.params
        const data_usuario = req.body

        const {rowCount} = await pool.query('UPDATE users SET username = $1, email = $2, password = $3, role_id = $4, created_at = $5, updated_at = $6, status = $7, name = $8, lastname = $9 WHERE user_id = $10',
            [data_usuario.username, data_usuario.email, data_usuario.password, data_usuario.role_id, data_usuario.created_at, data_usuario.updated_at, data_usuario.status, data_usuario.name, data_usuario.lastname, id]
        );

        if (rowCount === 0) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        return res.json({
            User: {
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
    } catch (error) {
        console.log('Error al crear el usuario:', error);

        if (error?.code === "23505" && error?.constraint === 'users_username_key'){
            return res.status(409).json({message: 'Error, Ya existe este username'});
        } //el error 409 indica conflicto

        if (error?.code === "23503"){ //el error 23503 indica una violación de la restricción de clave externa, acuerdate
            return res.status(422).json({message: 'Error, Solo se puede ingresar en el campo role_id el valor 1 o 2'});
        } 

        res.status(500).json({message: 'Error al actualizar el usuario'});
    }
    
}

