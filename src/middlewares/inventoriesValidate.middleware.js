import { StatusCodes } from 'http-status-codes';

const itemValidate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
        });
        return next();
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.issues?.[0]?.message || 'Error en validación',
        });
    }
};

export default itemValidate;