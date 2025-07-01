import { z } from 'zod';
import { partial } from 'zod/v4-mini';
import { validItemId } from '../utils/dbValidators.js';
import { validTenantId } from '../utils/dbValidators.js';

const ERROR_MESSAGES = {
    //USER ERRORS
    USERNAME_REQUIRED: 'Username es requerido',
    USERNAME_NOTEMPTY: 'Username no puede estar vacio',
    USERNAME_INVALID: 'Usuario invalido, debe terner minimo 4 caracteres',
    EMAIL_REQUIRRED: 'Email es requerido',
    EMAIL_NOTEMPTY: 'Email no puede estar vacio',
    EMAIL_INVALID: 'Debe ser un email válido',
    PASSWORD_REQUIRED: 'Contraseña requerida',
    PASSWORD_NOTEMPTY: 'Contraseña no puede estar vacio',
    PASSWORD_INVALID: 'Contraseña invalida, debe terner minimo 6 caracteres',
    ROLE_REQUIRED: 'Role_id es requerido',
    ROLE_NOTEMPTY: 'Role_id no puede estar vacio',
    ROLE_POSITIVE: 'Role_id deber ser positivo',
    ROLE_INT: 'Deber ser un numero entero',
    ROLE_INVALID: 'Role_id invalido, debe ser 1 o 2',
    NAME_REQUIRED: 'Nombre requerido',
    NAME_NOTEMPTY: 'Nombre no puede estar vacio',
    LASTNAME_REQUIRED: 'Apellido requerido',
    LASTNAME_NOTEMPTY: 'Apellido no puede estar vacio',
    STATUS_REQUIRED: 'Status requerido',
    STATUS_NOTEMPTY: 'Status no puede estar vacio',
    STATUS_INVALID: 'Status invalido, debe ser active, inactive o pending',

    //INVENTORIES ERRORS
    NAME_REQUIRED: 'Nombre es requerido',
    NAME_NOTEMPTY: 'Nombre no puede estar vacio',
    NAME_MAX: 'Nombre maximo puede tener 15 caracteres',
    NAME_NOTNUMBERS: 'El nombre solo debe contener letras',
    DESCRIPTION_REQUIRED: 'Descripcion es requerido',
    DESCRIPTION_NOTEMPTY: 'Descripcion no puede estar vacio',
    DESCRIPTION_MAX: 'Descripcion puede tener maximo 50 caracteres',
    DESCRIPTION_NOTNUMBERS: 'La descripcion solo debe contener letras',

    //INVENTORY_LOANS ERRORS
    ITEM_REQUIRED: 'Item_id es requerido',
    ITEM_NUMBER: 'Item_id debe ser un numero',
    ITEM_INT: 'Item_id debe ser un numero entero',
    ITEM_POSITIVE: 'Item debe ser un numero positivo',
    ITEM_ID_NOT_FOUND: 'El item no fue encontrado',
    ITEM_NOTEMPTY: 'Item_id no puede estar vacio',
    TENANT_REQUIRED: 'Tenant_id es requerido',
    TENANT_NUMBER: 'Tenant_id debe ser un numero',
    TENANT_INT: 'Tenant_id debe ser un numero entero',
    TENANT_POSITIVE: 'Tenant debe ser un numero positivo',
    TENANT_ID_NOT_FOUND: 'El inquilino no fue encontrado',
    TENANT_NOTEMPTY: 'tenant_id no puede estar vacio',
    LOAN_REQUIRED: 'Loan_date es requerido',
    LOAN_DATE_INVALID_FORMAT: 'El formato para la fecha que esta usando es invalido (ejemplo: 2004-03-01)',
    LOAN_DATE_NOTEMPTY: 'Loan_date no puede estar vacio',
    RETURN_DATE_INVALID_FORMAT: 'El formato para la fecha que esta usando es invalido (ejemplo: 2004-03-01)',
    DESCRIPTION_MIN: 'La descripcion tiene que tener un minimo de 5 caracteres',
    STATUS_BOOLEAN: 'Tipo de dato invalido, status debe ser un booleano: true o false',
    RETURN_DATE_BEFORE_LOAN: 'La fecha de devolucion debe ser posterior a la fecha de prestamo'
};

//SCHEMA USERS
export const createUserSchema = z.object({
    body: z.object({
        username: z.string({ required_error: ERROR_MESSAGES.USERNAME_REQUIRED }).min(1,{ message: ERROR_MESSAGES.USERNAME_NOTEMPTY }).min(4, { message: ERROR_MESSAGES.USERNAME_INVALID }),
        email: z.string({ required_error: ERROR_MESSAGES.EMAIL_REQUIRRED }).min(1,{ message: ERROR_MESSAGES.EMAIL_NOTEMPTY }).email({ message: ERROR_MESSAGES.EMAIL_INVALID }),
        password: z.string({ required_error: ERROR_MESSAGES.PASSWORD_REQUIRED }).min(1,{ message: ERROR_MESSAGES.PASSWORD_NOTEMPTY }).min(6, { message: ERROR_MESSAGES.PASSWORD_INVALID }),
        role_id: z.number({ required_error: ERROR_MESSAGES.ROLE_REQUIRED }).min(1,{ message: ERROR_MESSAGES.ROLE_NOTEMPTY }).positive({ message: ERROR_MESSAGES.ROLE_POSITIVE })
        .int({message: ERROR_MESSAGES.ROLE_INT }).refine((val) => val === 1 || val === 2, { message: ERROR_MESSAGES.ROLE_INVALID }),
        name: z.string({ required_error: ERROR_MESSAGES.NAME_REQUIRED }).min(1,{ message: ERROR_MESSAGES.NAME_NOTEMPTY }),
        lastname: z.string({ required_error: ERROR_MESSAGES.LASTNAME_REQUIRED }).min(1,{ message: ERROR_MESSAGES.LASTNAME_NOTEMPTY }), 
        status: z.string({ required_error: ERROR_MESSAGES.STATUS_REQUIRED}).min(1,{ message: ERROR_MESSAGES.STATUS_NOTEMPTY }).refine((val) => val === "active" || val === "inactive" || val === "pending", { message: ERROR_MESSAGES.STATUS_INVALID })
    })
})

export const updateUserSchema = z.object({
    body: z.object({
        username: z.string({ required_error: ERROR_MESSAGES.USERNAME_REQUIRED }).min(1,{ message: ERROR_MESSAGES.USERNAME_NOTEMPTY }).min(4, { message: ERROR_MESSAGES.USERNAME_INVALID }),
        email: z.string({ required_error: ERROR_MESSAGES.EMAIL_REQUIRRED }).min(1,{ message: ERROR_MESSAGES.EMAIL_NOTEMPTY }).email({ message: ERROR_MESSAGES.EMAIL_INVALID }),
        password: z.string({ required_error: ERROR_MESSAGES.PASSWORD_REQUIRED }).min(1,{ message: ERROR_MESSAGES.PASSWORD_NOTEMPTY }).min(6, { message: ERROR_MESSAGES.PASSWORD_INVALID }),
        role_id: z.number({ required_error: ERROR_MESSAGES.ROLE_REQUIRED }).min(1,{ message: ERROR_MESSAGES.ROLE_NOTEMPTY }).positive({ message: ERROR_MESSAGES.ROLE_POSITIVE })
        .int({message: ERROR_MESSAGES.ROLE_INT }).refine((val) => val === 1 || val === 2, { message: ERROR_MESSAGES.ROLE_INVALID }),
        name: z.string({ required_error: ERROR_MESSAGES.NAME_REQUIRED }).min(1,{ message: ERROR_MESSAGES.NAME_NOTEMPTY }),
        lastname: z.string({ required_error: ERROR_MESSAGES.LASTNAME_REQUIRED }).min(1,{ message: ERROR_MESSAGES.LASTNAME_NOTEMPTY }),
        status: z.string({ required_error: ERROR_MESSAGES.STATUS_REQUIRED}).min(1,{ message: ERROR_MESSAGES.STATUS_NOTEMPTY }).refine((val) => val === "active" || val === "inactive" || val === "pending", { message: ERROR_MESSAGES.STATUS_INVALID })
    })
})

//SCHEMA INVENTORIES
export const createItemSchema = z.object({
    body: z.object({
        name: z.string({ required_error: ERROR_MESSAGES.NAME_REQUIRED }).min(1,{ message: ERROR_MESSAGES.NAME_NOTEMPTY }).max(15, { message: ERROR_MESSAGES.NAME_MAX}).regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {message: ERROR_MESSAGES.NAME_NOTNUMBERS}),
        description: z.string({ required_error: ERROR_MESSAGES.DESCRIPTION_REQUIRED }).min(1,{ message: ERROR_MESSAGES.DESCRIPTION_NOTEMPTY }).max(50, { message: ERROR_MESSAGES.DESCRIPTION_MAX})
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {message: ERROR_MESSAGES.DESCRIPTION_NOTNUMBERS}),
    })
})

export const updateItemSchema = z.object({
    body: z.object({
        name: z.string({ required_error: ERROR_MESSAGES.NAME_REQUIRED }).min(1,{ message: ERROR_MESSAGES.NAME_NOTEMPTY }).max(15, { message: ERROR_MESSAGES.NAME_MAX}).regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {message: ERROR_MESSAGES.NAME_NOTNUMBERS}),
        description: z.string({ required_error: ERROR_MESSAGES.DESCRIPTION_REQUIRED }).min(1,{ message: ERROR_MESSAGES.DESCRIPTION_NOTEMPTY }).max(50, { message: ERROR_MESSAGES.DESCRIPTION_MAX})
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {message: ERROR_MESSAGES.DESCRIPTION_NOTNUMBERS}),
    })
})

//SCHEMA INVENTORY_LOANS
export const createLoanSchema = z.object({
    body: z.object({
        item_id: z.number({ required_error:ERROR_MESSAGES.ITEM_REQUIRED, invalid_type_error: ERROR_MESSAGES.ITEM_NUMBER }).int({ message: ERROR_MESSAGES.ITEM_INT }).positive({ message:ERROR_MESSAGES.ITEM_POSITIVE }).min(1, { message: ERROR_MESSAGES.ITEM_NOTEMPTY })
        .refine(async (itemId) => await validItemId(itemId),{ message:ERROR_MESSAGES.ITEM_ID_NOT_FOUND}),
        tenant_id: z.number({ required_error:ERROR_MESSAGES.TENANT_REQUIRED, invalid_type_error: ERROR_MESSAGES.TENANT_NUMBER }).int({ message:ERROR_MESSAGES.TENANT_INT }).positive({ message:ERROR_MESSAGES.TENANT_POSITIVE }).min(1, { message: ERROR_MESSAGES.TENANT_NOTEMPTY })
        .refine(async (tenantId) => await validTenantId(tenantId),{ message: ERROR_MESSAGES.TENANT_ID_NOT_FOUND}),
        loan_date: z.string({ required_error: ERROR_MESSAGES.LOAN_REQUIRED }).regex(/^\d{4}-\d{2}-\d{2}$/, { message: ERROR_MESSAGES.LOAN_DATE_INVALID_FORMAT }).min(1, { message:ERROR_MESSAGES.LOAN_DATE_NOTEMPTY }),
        return_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: ERROR_MESSAGES.RETURN_DATE_INVALID_FORMAT }).optional()
        .superRefine((data, ctx) => {
            if (!data.return_date) return; 
            if (new Date(data.return_date) <= new Date(data.loan_date)) {
                ctx.addIssue({
                    path: ['return_date'],
                    message: ERROR_MESSAGES.RETURN_DATE_BEFORE_LOAN,
                });
            }
        }),
        description: z.string({ requires_error: ERROR_MESSAGES.DESCRIPTION_REQUIRED }).min(5, { message: ERROR_MESSAGES.DESCRIPTION_MIN }).max(50, { message: ERROR_MESSAGES.DESCRIPTION_MAX}).min(1, { message:ERROR_MESSAGES.DESCRIPTION_NOTEMPTY }), 
        status: z.boolean({ required_error:ERROR_MESSAGES.STATUS_REQUIRED, invalid_type_error:ERROR_MESSAGES.STATUS_BOOLEAN })
    })
})

export const updateLoanSchema = z.object({
    body: z.object({
        item_id: z.number({ required_error:ERROR_MESSAGES.ITEM_REQUIRED, invalid_type_error: ERROR_MESSAGES.ITEM_NUMBER }).int({ message: ERROR_MESSAGES.ITEM_INT }).positive({ message:ERROR_MESSAGES.ITEM_POSITIVE }).min(1, { message: ERROR_MESSAGES.ITEM_NOTEMPTY })
        .refine(async (itemId) => await validItemId(itemId),{ message:ERROR_MESSAGES.ITEM_ID_NOT_FOUND}),
        tenant_id: z.number({ required_error:ERROR_MESSAGES.TENANT_REQUIRED, invalid_type_error: ERROR_MESSAGES.TENANT_NUMBER }).int({ message:ERROR_MESSAGES.TENANT_INT }).positive({ message:ERROR_MESSAGES.TENANT_POSITIVE }).min(1, { message: ERROR_MESSAGES.TENANT_NOTEMPTY })
        .refine(async (tenantId) => await validTenantId(tenantId),{ message: ERROR_MESSAGES.TENANT_ID_NOT_FOUND}),
        loan_date: z.string({ required_error: ERROR_MESSAGES.LOAN_REQUIRED }).regex(/^\d{4}-\d{2}-\d{2}$/, { message: ERROR_MESSAGES.LOAN_DATE_INVALID_FORMAT }).min(1, { message:ERROR_MESSAGES.LOAN_DATE_NOTEMPTY }),
        return_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: ERROR_MESSAGES.RETURN_DATE_INVALID_FORMAT }).optional()
        .superRefine((data, ctx) => {
            if (!data.return_date) return;
            if (new Date(data.return_date) <= new Date(data.loan_date)) {
                ctx.addIssue({
                    path: ['return_date'],
                    message: ERROR_MESSAGES.RETURN_DATE_BEFORE_LOAN,
                });
            }
        }),
        description: z.string({ requires_error: ERROR_MESSAGES.DESCRIPTION_REQUIRED }).min(5, { message: ERROR_MESSAGES.DESCRIPTION_MIN }).max(50, { message: ERROR_MESSAGES.DESCRIPTION_MAX}).min(1, { message:ERROR_MESSAGES.DESCRIPTION_NOTEMPTY }), 
        status: z.boolean({ required_error:ERROR_MESSAGES.STATUS_REQUIRED, invalid_type_error:ERROR_MESSAGES.STATUS_BOOLEAN })
    })
})

