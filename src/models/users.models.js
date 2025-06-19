import pool from "../db.js"

export async function getUsers() {
    const { rows } = await pool.query('SELECT * FROM users')
    return rows;
}

export async function getUsersID(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return rows[0];
}

export async function createUser(user) {
    const { username, email, password, role_id, created_at, updated_at, status, name, lastname } = user;
    const { rows } = await pool.query(`INSERT INTO users (username, email, password, role_id, created_at, updated_at, status, name, lastname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, 
        [username, email, password, role_id, created_at, updated_at, status, name, lastname]
    );
    return rows;
}

export async function updateUser(id, user) {
    const { username, email, password, role_id, created_at, updated_at, status, name, lastname } = user;
    const { rows } = await pool.query('UPDATE users SET username = $1, email = $2, password = $3, role_id = $4, created_at = $5, updated_at = $6, status = $7, name = $8, lastname = $9 WHERE user_id = $10 RETURNING *',
        [username, email, password, role_id, created_at, updated_at, status, name, lastname, id]
    );
    return rows[0];
}

export async function deleteUser(id) {
    const { rowCount } = await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
    return rowCount; 
}
