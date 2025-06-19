import { z } from "zod";
import { createError } from "../utils/errorList.js";
import tenantsModels from "../models/tenants.models.js"; 

export const contractSchema = z.object({
  registered_user: z.number({
    required_error: "El usuario registrado es obligatorio",
    invalid_type_error: "El usuario registrado debe ser un número entero positivo"
  }).int().positive("El usuario registrado debe ser un número entero positivo"),
  
  contract_number: z.string({
    required_error: "El número de contrato es obligatorio",
    invalid_type_error: "El número de contrato debe ser un string"
  }).regex(/^CNT-\d+$/, "El número de contrato debe tener el formato: CNT-###"),
  
  location_id: z.number({
    required_error: "El ID de ubicación es obligatorio",
    invalid_type_error: "El ID de ubicación debe ser un número entero positivo"
  }).int().positive("El ID de ubicación debe ser un número entero positivo"),
  
  rent_amount: z.string({
    required_error: "El monto de renta es obligatorio",
    invalid_type_error: "El monto de renta debe ser un string"
  }).regex(/^\d+(\.\d{2})$/, "El monto de renta debe tener el formato: 1700.00"),
  
  activity: z.string({
    required_error: "La actividad es obligatoria",
    invalid_type_error: "La actividad debe ser un string"
  }).min(1, "La actividad no puede estar vacía"),
  
  duration_description: z.string({
    required_error: "La duración es obligatoria",
    invalid_type_error: "La duración debe ser un string"
  }).min(1, "La duración no puede estar vacía"),
  
  init_date: z.string({
    required_error: "La fecha de inicio es obligatoria",
    invalid_type_error: "La fecha de inicio debe ser un string"
  }).regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, "La fecha de inicio debe tener formato ISO 8601"),
  
  end_date: z.string({
    required_error: "La fecha de fin es obligatoria",
    invalid_type_error: "La fecha de fin debe ser un string"
  }).regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, "La fecha de fin debe tener formato ISO 8601"),
  
  business_name: z.string({
    required_error: "El nombre del negocio es obligatorio",
    invalid_type_error: "El nombre del negocio debe ser un string"
  }).min(1, "El nombre del negocio no puede estar vacío"),
  
  entry_time: z.string({
    required_error: "La hora de entrada es obligatoria",
    invalid_type_error: "La hora de entrada debe ser un string"
  }).regex(/^\d{2}:\d{2}:\d{2}$/, "La hora de entrada debe tener el formato: HH:mm:ss"),
  
  exit_time: z.string({
    required_error: "La hora de salida es obligatoria",
    invalid_type_error: "La hora de salida debe ser un string"
  }).regex(/^\d{2}:\d{2}:\d{2}$/, "La hora de salida debe tener el formato: HH:mm:ss"),
  
  id_number: z
    .string({
      required_error: "El número de cédula es obligatorio",
      invalid_type_error: "El número de cédula debe ser un string"
    })
    .min(5, "El número de cédula debe tener al menos 5 dígitos")
    .max(15, "El número de cédula es demasiado largo")
    .regex(/^\d+$/, "El número de cédula solo debe contener números"),


  daysWork: z.any().nullable(),
});

export async function validateContracts(data) {
  try {
    contractSchema.parse(data);

    const result = await tenantsModels.getById(data.id_number);
    if (!result.rows || result.rows.length === 0) {
      throw createError('VALIDATION_ERROR', [
        { path: ['id_number'], message: 'El número de cédula no existe en la base de datos de inquilinos' }
      ]);
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw createError('VALIDATION_ERROR', err.errors);
    }
    throw err;
  }
}