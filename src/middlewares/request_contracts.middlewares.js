import errorlist from '../utils/errorList.js';

export default function errorHandler(err, req, res, next) {
    // 1. Errores personalizados lanzados con createError (como los de Zod)
    if (err.name && errorlist[err.name]) {
        const customErr = errorlist[err.name];
        return res.status(customErr.status).json({
            errors: err.details ? err.details : undefined
        });
    }

    // 2. Errores de duplicidad de Postgres
    if (err.code === '23505' || err.code === 23505) {
        const customErr = errorlist.DUPLICATE_ID_NUMBER;
        return res.status(customErr.status).json({
            error: customErr.error,
            message: customErr.message,
            //errors: [{ campo: 'id_number', mensaje: customErr.message }]
        });
    }

    // 3. Error genérico
    const customErr = errorlist.INTERNAL_SERVER_ERROR;
    return res.status(customErr.status).json({
        error: customErr.error,
        message: customErr.message
    });
}