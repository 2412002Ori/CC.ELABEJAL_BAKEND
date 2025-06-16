import pool from "../src/db.js"

export const getItem = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM inventories')
    console.log(rows);
    res.json(rows);
}

export const getItemID = async (req, res) => { 
    const {id} = req.params;
    const {rows} = await pool.query('SELECT * FROM inventories WHERE item_id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({message: 'Item no encontrado'});
    }

    res.json(rows[0]);
}

export const createItem = async (req, res) => { 
    try{
        const data_item = req.body

        if (!data_item.name || !data_item.description) {
            return res.status(400).json({
                message: 'Error, el nombre y la descripción son obligatorios'
            });
        }

        await pool.query('INSERT INTO inventories (name, description) VALUES ($1, $2)',
            [data_item.name, data_item.description]
        );

        res.status(201).json({
            message: 'Item creado correctamente',
            Item: {
                name: data_item.name,
                description: data_item.description
            }
        });
    } catch (error) {
        console.log('Error al crear el item:', error);

        if (error?.code === "23505" && error?.constraint === 'inventories_pkey'){
            return res.status(409).json({message: 'Error, Ya existe la llave primaria'});
        }

        res.status(500).json({message: 'Error al crear el item'});
    }
}

export const deleteItem = async (req, res) => {
    const {id} = req.params
    const data_item = req.body

    const {rowCount} = await pool.query('DELETE FROM inventories WHERE item_id = $1 RETURNING *', [id]);

    if (rowCount === 0) {
        return res.status(404).json({message: 'Item no encontrado'});
    }

    return res.json({
        Item: {
            message: 'Item eliminado correctamente',
            item_id: id,
            name: data_item.name,
            description: data_item.description
        }
    });

    // return res.sendStatus(204);
}

export const updateItem = async (req, res) => { 
    try {
        const {id} = req.params
        const data_item = req.body

        const {rowCount} = await pool.query('UPDATE inventories SET name = $1, description = $2 WHERE item_id = $3',
            [data_item.name, data_item.description, id]
        );

        if (rowCount === 0) {
            return res.status(404).json({message: 'Item no encontrado'});
        }

        return res.json({
            Item: {
                item_id: id,
                name: data_item.name,
                description: data_item.description
            }
    });
    } catch (error) {
        console.log('Error al crear el item:', error);

        if (error?.code === "23505" && error?.constraint === 'inventories_pkey'){
            return res.status(409).json({message: 'Error, Ya existe la llave primaria'});
        }

        res.status(500).json({message: 'Error al crear el item'});
    }
    
}