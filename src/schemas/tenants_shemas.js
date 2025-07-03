import { z } from "zod";
import { createError } from "../utils/errorList.js";
import tenantsModels from "../models/tenants.models.js";

export const tenantSchema = z.object({
  id_number: z.string({
    required_error: "El número de cédula es obligatorio",
    invalid_type_error: "El número de cédula debe ser un string"
  })
    .min(5, "El número de cédula debe tener al menos 5 dígitos")
    .max(15, "El número de cédula es demasiado largo")
    .regex(/^\d+$/, "El número de cédula solo debe contener números"),

  rif: z.string({
    required_error: "El RIF es obligatorio",
    invalid_type_error: "El RIF debe ser un string"
  }).min(1, "El RIF no puede estar vacío"),

  full_name: z.string({
    required_error: "El nombre completo es obligatorio",
    invalid_type_error: "El nombre completo debe ser un string"
  }).min(1, "El nombre completo no puede estar vacío"),

  age: z.number({
    required_error: "La edad es obligatoria",
    invalid_type_error: "La edad debe ser un número entero"
  }).int().min(18, "La edad debe ser al menos 18"),

  phone: z.string({
    required_error: "El teléfono es obligatorio",
    invalid_type_error: "El teléfono debe ser un string"
  }).min(7, "El teléfono debe tener al menos 7 caracteres"),

  email: z.string({
    required_error: "El correo electrónico es obligatorio",
    invalid_type_error: "El correo electrónico debe ser un string"
  }).email("El correo electrónico no es válido"),

  address: z.string({
    required_error: "La dirección es obligatoria",
    invalid_type_error: "La dirección debe ser un string"
  }).min(1, "La dirección no puede estar vacía"),
});


export async function validateTenant(data) {
  try {
    tenantSchema.parse(data);

    const existing = await tenantsModels.getAll(); 
    
    const alreadyRegistered = existing.rows?.some(tenant =>
      tenant.id_number === data.id_number &&
      tenant.rif === data.rif &&
      tenant.full_name === data.full_name &&
      tenant.age === data.age &&
      tenant.phone === data.phone &&
      tenant.email === data.email &&
      tenant.address === data.address
    );

    if (alreadyRegistered) {
      throw createError('USER_ALREADY_REGISTERED');
    }
   
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw createError('VALIDATION_ERROR', err.errors);
    }
    throw err; 
  }
}
