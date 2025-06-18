const errorlist = {

    INTERNAL_SERVER_ERROR :{
        status:500,
        message : "Error interno del servidor ",
        error : "internalServerError",
    },
    
    VALIDATION_ERROR: {
        status: 400,
        message: "Error de validación de datos",
        error: "validationError",
    },

    DUPLICATE_ID_NUMBER: {
        status: 400,
        message: "El número de cédula ya está registrado.",
        error: "duplicateIdNumber",
    }


}; export default errorlist;

export function createError(code , details){
    const{
        status = 500 ,
        message = "Error interno",
        error = "internalServerError",
    }=errorlist [code] || {};
    const err = new Error(message);
    err.status= status;
    err.name = code; 
    if (details) err.details = details;
    return err ; 
}