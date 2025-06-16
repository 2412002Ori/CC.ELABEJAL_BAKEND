import pool from "../src/db.js"

export const getLoans = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM inventory_loans')
    console.log(rows);
    res.json(rows);
}

export const getLoansID = async (req, res) => { 
    const {id} = req.params;
    const {rows} = await pool.query('SELECT * FROM inventory_loans WHERE loan_id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({message: 'Prestamo no encontrado'});
    }

    res.json(rows[0]);
}

export const createLoans = async (req, res) => { 
    try{
        const data_loan = req.body

        // if (data_loan.return_date <= data_loan.loan_date) {
        //     return res.status(400).json({ 
        //         message: 'Error, la fecha de devolución debe ser posterior a la fecha en que se hizo el préstamo',
        //     });
        // }

        const allowedStatuses = ["true", "false"];
        if (!allowedStatuses.includes(data_loan.status)) {
            return res.status(400).json({ 
                message: 'Error, el status debe ser uno de estos: ' + allowedStatuses.join(", "),
            });
        }

        await pool.query('INSERT INTO inventory_loans (item_id, tenant_id, loan_date, return_date, description, status) VALUES ($1, $2, $3, $4, $5, $6)',
            [data_loan.item_id, data_loan.tenant_id, data_loan.loan_date, data_loan.return_date, data_loan.description, data_loan.status]
        );

        res.status(201).json({
            message: 'Prestamo creado correctamente',
            Loan: {
                loan_id: data_loan.loan_id,
                item_id: data_loan.item_id,
                tenant_id: data_loan.tenant_id,
                loan_date: data_loan.loan_date,
                return_date: data_loan.return_date,
                description: data_loan.description,
                status: data_loan.status
            }
        });
    } catch (error) {
        console.log('Error al crear el prestamo:', error);

        if (error?.code === "23505" && error?.constraint === 'inventory_loans_pkey'){
            return res.status(409).json({message: 'Error, Ya existe la llave primaria'});
        }

        if (error?.code === "23503" && error?.constraint === 'inventory_loans_tenant_id_fkey'){ 
            return res.status(422).json({message: 'Error, Solo se puede ingresar en el campo tenant_id el valor 1 al 11'});
        } 

        if (error?.code === "23503" && error?.constraint === 'inventory_loans_item_id_fkey'){ 
            return res.status(422).json({message: 'Error, Solo se puede ingresar en el campo item_id el valor 1 al 7'}); //NO HE PODIDO ACTUALIZAR CON LA PROPIA TABLA EN LA BD
        } 

        res.status(500).json({message: 'Error al crear el prestamo'});
    }
}

export const deleteLoan = async (req, res) => {
    const {id} = req.params
    const data_loan = req.body

    const {rowCount} = await pool.query('DELETE FROM inventory_loans WHERE loan_id = $1 RETURNING *', [id]);

    if (rowCount === 0) {
        return res.status(404).json({message: 'Prestamo no encontrado'});
    }

    return res.json({
        Loan: {
            message: 'Prestamo eliminado correctamente',
            loan_id: id,
            item_id: data_loan.item_id,
            tenant_id: data_loan.tenant_id,
            loan_date: data_loan.loan_date,
            return_date: data_loan.return_date,
            description: data_loan.description,
            status: data_loan.status
        }
    });

    // return res.sendStatus(204);
}

export const updateLoan = async (req, res) => { 
    try {
        const {id} = req.params
        const data_loan = req.body

        // if (data_loan.return_date <= data_loan.loan_date) {
        //     return res.status(400).json({ 
        //         message: 'Error, la fecha de devolución debe ser posterior a la fecha en que se hizo el préstamo',
        //     });
        // }

        const allowedStatuses = ["true", "false"];
        if (!allowedStatuses.includes(data_loan.status)) {
            return res.status(400).json({ 
                message: 'Error, el status debe ser uno de estos: ' + allowedStatuses.join(", "),
            });
        }

        const {rowCount} = await pool.query('UPDATE inventory_loans SET item_id = $1, tenant_id = $2, loan_date = $3, return_date = $4, description = $5, status = $6 WHERE loan_id = $7',
            [data_loan.item_id, data_loan.tenant_id, data_loan.loan_date, data_loan.return_date, data_loan.description, data_loan.status, id]
        );

        if (rowCount === 0) {
            return res.status(404).json({message: 'Prestamo no encontrado'});
        }

        return res.json({
            Loan: {
                loan_id: id,
                item_id: data_loan.item_id,
                tenant_id: data_loan.tenant_id,
                loan_date: data_loan.loan_date,
                return_date: data_loan.return_date,
                description: data_loan.description,
                status: data_loan.status
            }
        });
    } catch (error) {
        console.log('Error al crear el prestamo:', error);

        if (error?.code === "23505" && error?.constraint === 'inventory_loans_pkey'){
            return res.status(409).json({message: 'Error, Ya existe la llave primaria'});
        }

        if (error?.code === "23503" && error?.constraint === 'inventory_loans_tenant_id_fkey'){ 
            return res.status(422).json({message: 'Error, Solo se puede ingresar en el campo tenant_id el valor 1 al 11'});
        } 

        if (error?.code === "23503" && error?.constraint === 'inventory_loans_item_id_fkey'){ 
            return res.status(422).json({message: 'Error, Solo se puede ingresar en el campo item_id el valor 1 al 7'}); //NO HE PODIDO ACTUALIZAR CON LA PROPIA TABLA EN LA BD
        } 

        res.status(500).json({message: 'Error al crear el prestamo'});
    }
}
