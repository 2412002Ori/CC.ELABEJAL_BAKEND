import pool from '../db.js';
//Aqui hago una busqueda dinamica, verifico si la columna item_id de la tabla inventory_loans tiene el prestamo existente
export async function validItemId(itemId) {
    try{
        const query = 'SELECT 1 FROM inventories WHERE item_id = $1';
        const result = await pool.query(query, [itemId]);
        return result.rowCount > 0;
    } catch (error) {
        console.error("Error en validItemId:", error);
        return false;
    }
}

//Aqui hago una busqueda dinamica, verifico si la columna tenant_id de la tabla tenants tiene el inquilino existente
export async function validTenantId(tenantId) {
    try {
        const query = 'SELECT 1 FROM tenants WHERE tenant_id = $1';
        const result = await pool.query(query, [tenantId]);
        return result.rowCount > 0; 
    } catch (error) {
        console.error("Error en validTenantId:", error);
        return false;
    }
}
