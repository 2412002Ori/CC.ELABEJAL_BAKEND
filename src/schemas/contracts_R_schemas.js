import { z } from "zod";
import { createError } from "../utils/errorList.js";

export const createrequestContracts = z.object({
  id_number: z
    .string()
    .min(5, "El número de cédula debe tener al menos 5 dígitos")
    .max(15, "El número de cédula es demasiado largo")
    .regex(/^\d+$/, "El número de cédula solo debe contener números"),
  full_name: z
    .string()
    .min(3, "El nombre completo debe tener al menos 3 caracteres"),
  request_date: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      { message: "La fecha no es válida" }
    ),
  activity: z
    .string()
    .min(3, "La actividad debe tener al menos 3 caracteres"),
    
  email: z
    .string()
    .email("El correo electrónico no es válido"),
  phone: z
    .string()
    .min(10, "El Número de teléfono debe tener al menos 10 dígitos")
    .max(15, "El Numero de Teléfono es demasiado largo")
    .regex(/^\d+$/, "El Numero de Teléfono solo debe contener números"),
});

export function validateRequestContracts(data) {
  try {
    createrequestContracts.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      
      throw createError('VALIDATION_ERROR', err.errors);
    }
    throw err;
  }
}

// contracts_R_schemas.js
export const updateRequestContracts = createrequestContracts.omit({ id_number: true });

export function validateUpdateRequestContracts(data) {
  try {
    updateRequestContracts.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw createError('VALIDATION_ERROR', err.errors);
    }
    throw err;
  }
}
