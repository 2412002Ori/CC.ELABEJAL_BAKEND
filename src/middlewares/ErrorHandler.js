import { ZodError } from "zod";
import errorlist from '../utils/errorList.js';

export default function errorHandler(err, req, res, next) {
    
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: "validationError",
            message: "Error de validación",
            details: err.errors
        });
    }

    console.error("Error recibido en errorHandler:", err);
    if (err.name && errorlist[err.name]) {
        const customErr = errorlist[err.name];
        return res.status(customErr.status).json({
            error: customErr.error,
            message: err.message || customErr.message,
            details: err.details ? err.details : undefined
        });
    }

    // Errores de duplicidad de Postgres para contract_number
    if (
        (err.code === '23505' || err.code === 23505) &&
        err.constraint === 'contracts_contract_number_key'
    ) {
        const customErr = errorlist.DUPLICATE_CONTRACT_NUMBER;
        return res.status(customErr.status).json({
            error: customErr.error,
            message: customErr.message,
        });
    }

    // Errores de duplicidad de Postgres para id_number (por compatibilidad)
    if (err.code === '23505' || err.code === 23505) {
        const customErr = errorlist.DUPLICATE_ID_NUMBER;
        return res.status(customErr.status).json({
            error: customErr.error,
            message: customErr.message,
        });
    }

    // Errores de duplicidad de Postgres para payments
    if (
        (err.code === '23505' || err.code === 23505) &&
        err.constraint === 'payments_contract_number_key'
    ) {
        const customErr = errorlist.DUPLICATE_PAYMENT;
        return res.status(customErr.status).json({
            error: customErr.error,
            message: customErr.message,
        });
    }

    // Error genérico por defecto
    res.status(500).json({
        error: "internalServerError",
        message: "Error interno del servidor",
        details: err.message
    });
}