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
    },

    DUPLICATE_CONTRACT_NUMBER: {
        status: 400,
        message: "El número de contrato ya está registrado.",
        error: "duplicateContractNumber",
    },

    DUPLICATE_PAYMENT: {
        status: 409,
        message: "El pago ya fue registrado anteriormente.",
        error: "duplicatePayment",
    },

    USER_ALREADY_REGISTERED: {
        status: 400,
        message: "Usuario ya registrado.",
        error: "userAlreadyRegistered",
    },

}; export default errorlist;

export function createError(code , details){
    const{
        status = 500 ,
        message = "Error interno",
        error = "internalServerError",
    }=errorlist [code] || {};
    console.log("createError code:", code, "status:", status);
    const err = new Error(message);
    err.status= status;
    err.name = code; 
    if (details) err.details = details;
    return err ; 
}