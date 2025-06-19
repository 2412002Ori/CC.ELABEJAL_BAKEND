import * as ItemsModel from '../models/inventories.models.js'

export async function getItems (req, res){
    const items = await ItemsModel.getItems();
    res.json(items)
} 

export async function getItemID (req, res){
    const id = req.params.id;
    const item = await ItemsModel.getItemID(id);
    if (!item || item.length === 0) {
        return res.status(404).json({message: 'Item no encontrado'});
    }
    res.json(item);
}

export async function createItem (req, res){
    try{
        const item = await ItemsModel.createItem(req.body)

        res.status(201).json(item);
    } catch (error) {
        console.log('Error al crear el item:', error);

        if (error?.code === "23505" && error?.constraint === 'inventories_pkey'){
            return res.status(409).json({message: 'Error, Ya existe la llave primaria'});
        }

        res.status(500).json({message: 'Error al crear el item'});
    }
}

export async function updateItem (req, res){
    const id = req.params.id
    try {
        const item = await ItemsModel.updateItem(id, req.body)

        if (!item) {
            return res.status(404).json({message: 'Item no encontrado'});
        }

        return res.json(item);
    } catch (error) {
        if (error?.code === "23505" && error?.constraint === 'inventories_pkey'){
            return res.status(409).json({message: 'Error, Ya existe la llave primaria'});
        }

        res.status(500).json({message: 'Error al crear el item'});
    }
}

export async function deleteItem (req, res){
    const id = req.params.id
    const item = await ItemsModel.deleteItem(id)

    if (!item) {
        return res.status(404).json({message: 'Item no encontrado'});
    }

    return res.json(item);
}