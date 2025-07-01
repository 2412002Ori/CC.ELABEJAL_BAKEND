import pool from '../db.js';

export async function getLoans() {
    const { rows } = await pool.query('SELECT * FROM inventory_loans');
    return rows;
}

export async function getLoanById(id) {
    const { rows } = await pool.query('SELECT * FROM inventory_loans WHERE loan_id = $1', [id]);
    return rows[0];
}

export async function createLoan(data_loan) {
    const { item_id, tenant_id, loan_date, return_date, description, status } = data_loan;
    const { rows } = await pool.query(
        `INSERT INTO inventory_loans (item_id, tenant_id, loan_date, return_date, description, status)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [item_id, tenant_id, loan_date, return_date, description, status]
    );
    return rows[0];
}

export async function deleteLoan(id) {
    const { rows } = await pool.query('DELETE FROM inventory_loans WHERE loan_id = $1 RETURNING *', [id]);
    return rows[0];
}

export async function updateLoan(id, data_loan) {
    const { item_id, tenant_id, loan_date, return_date, description, status } = data_loan;
    const { rows } = await pool.query(`UPDATE inventory_loans SET item_id = $1, tenant_id = $2, loan_date = $3, return_date = $4, description = $5, status = $6 WHERE loan_id = $7 RETURNING *`,
        [item_id, tenant_id, loan_date, return_date, description, status, id]
    );
    return rows[0];
}
