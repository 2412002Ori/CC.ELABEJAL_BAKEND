import { z } from "zod";
import { createError } from "../utils/errorList.js";
import paymentsModels from "../models/payments.models.js";

export const paymentSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount format" }),
  payment_date: z.string().datetime({ message: "Invalid payment_date format" }),
  created_at: z.string().datetime({ message: "no estas ingresando un formato válido " }),
  updated_at: z.string().datetime({ message: "no estas ingresando un formato válido " }),
  page_month: z.string(),
  year_payment: z.string().regex(/^\d{4}$/, { message: "Invalid year format" }),
  description: z.string().min(1, { message: "La descripción no puede estar vacía" }),
  contract_number: z.string(),
});

export async function validateUniquePayment(paymentData) {
  const exists = await paymentsModels.findDuplicate({
    amount: paymentData.amount,
    payment_date: paymentData.payment_date,
    contract_number: paymentData.contract_number,
  });
  if (exists) {
    throw createError("DUPLICATE_PAYMENT");
  }
}