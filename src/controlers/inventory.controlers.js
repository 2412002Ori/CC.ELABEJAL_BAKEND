import * as LoanModel from '../models/inventory.models.js'

export async function getLoans (req, res) {
    const loans = await LoanModel.getLoans();
    res.json(loans);
};

export async function getLoansID (req, res){
    const id = req.params.id;
    const loan = await LoanModel.getLoanById(id);
    if (!loan) {
        return res.status(404).json({ message: 'Prestamo no encontrado' });
    }
    res.json(loan);
};

export async function createLoans(req, res){
    try {
        const data_loan = req.body;
    
        const loan = await LoanModel.createLoan(data_loan);
        res.status(201).json({
            message: 'Prestamo creado correctamente',
            Loan: loan
        });
    } catch (error) {
        if (error?.code === "23505" && error?.constraint === 'inventory_loans_pkey'){
            return res.status(409).json({message: 'Error, Ya existe la llave primaria'});
        }

        res.status(500).json({message: 'Error al crear el prestamo'});
    }
};

export async function updateLoan(req, res){
    try {
        const { id } = req.params;
        const data_loan = req.body;
    
        const loan = await LoanModel.updateLoan(id, data_loan);
        if (!loan) {
            return res.status(404).json({ message: 'Prestamo no encontrado' });
        }
        res.json({
            message: 'Prestamo actualizado correctamente',
            Loan: loan
        });
    } catch (error) {
        if (error?.code === "23505" && error?.constraint === 'inventory_loans_pkey'){
            return res.status(409).json({message: 'Error, Ya existe la llave primaria'});
        }
        
        res.status(500).json({message: 'Error al actualizar el prestamo'});
    }
};

export async function deleteLoan(req, res){
    const id = req.params.id;
    const loan = await LoanModel.deleteLoan(id);
    if (!loan) {
        return res.status(404).json({ message: 'Prestamo no encontrado' });
    }
    res.json({
        message: 'Prestamo eliminado correctamente',
        Loan: loan
    });
};