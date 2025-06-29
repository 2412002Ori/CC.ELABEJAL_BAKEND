import pool from "../db.js";
import { validate } from "email-validator";

export const UsersModel = {
    async createUser(userData) {
        // Validación de email
        if (!validate(userData.email) || !userData.email.endsWith("@gmail.com")) {
            throw new Error('Error, el correo debe ser válido y tener dominio @gmail.com');
        }

        const { rows } = await pool.query(
            'INSERT INTO users (username, email, password, role_id, created_at, updated_at, status, name, lastname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [userData.username, userData.email, userData.password, userData.role_id, userData.created_at, userData.updated_at, userData.status, userData.name, userData.lastname]
        );

        return {
            message: 'Usuario creado correctamente',
            user: rows[0]
        };
    },

    async updateUser(id, userData) {
        const { rows } = await pool.query(
            'UPDATE users SET username = $1, email = $2, password = $3, role_id = $4, created_at = $5, updated_at = $6, status = $7, name = $8, lastname = $9 WHERE user_id = $10 RETURNING *',
            [userData.username, userData.email, userData.password, userData.role_id, userData.created_at, userData.updated_at, userData.status, userData.name, userData.lastname, id]
        );

        if (rows.length === 0) {
            return null;
        }

        return {
            message: 'Usuario actualizado correctamente',
            user: rows[0]
        };
    }
}; 