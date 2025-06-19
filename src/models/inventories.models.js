import pool from "../db.js"

export async function getItems(){
    const { rows } = await pool.query('SELECT * FROM inventories')
    console.log(rows);
    return rows;
}
export async function getItemID(id){
    const { rows } = await pool.query('SELECT * FROM inventories WHERE item_id = $1', [id]);
    return rows[0];
}

export async function createItem(item){
    const {name, description} = item;
    const { rows } = await pool.query(`INSERT INTO inventories (name, description) VALUES ($1, $2) RETURNING *`, 
        [name, description]
    );
    return rows;
}

export async function updateItem (id, item) {
    const { name, description } = item;
    const { rows } = await pool.query('UPDATE inventories SET name = $1, description = $2 WHERE item_id = $3 RETURNING *', [name, description, id]);
    return rows[0];
}

export async function deleteItem (id){
    const { rows } = await pool.query('DELETE FROM inventories WHERE item_id = $1 RETURNING *', [id]);
    return rows[0]; 
}


