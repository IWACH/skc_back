import { z } from "zod";

import {
  idParamSchema,
  paginationSchema,
} from "../../../shared/schemas/baseValidations.schema.ts";

const countryBodySchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(1, "El nombre no puede estar vacío")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  code: z
    .string({
      required_error: "El código es requerido",
      invalid_type_error: "El código debe ser un texto",
    })
    .max(3, "El código no puede exceder los 3 caracteres"),
  phoneCode: z
    .string({
      required_error: "El código de teléfono es requerido",
      invalid_type_error: "El código de teléfono debe ser un texto",
    })
    .max(20, "El código de teléfono no puede exceder los 20 caracteres")
    .optional(),
  currency: z
    .string({
      required_error: "La moneda es requerida",
      invalid_type_error: "La moneda debe ser un texto",
    })
    .max(3, "La moneda no puede exceder los 3 caracteres")
    .optional(),
  active: z
    .boolean({
      required_error: "El estado activo es requerido",
      invalid_type_error: "El estado activo debe ser un booleano",
    })
    .default(true),
});

export const createCountrySchema = z.object({
  body: countryBodySchema,
});

export const getAllCountriesSchema = z.object({
  query: paginationSchema,
});

export const getCountrySchema = z.object({
  params: idParamSchema,
});

export const updateCountrySchema = z.object({
  params: idParamSchema,
  body: countryBodySchema.partial(),
});

export const deleteCountrySchema = z.object({
  params: idParamSchema,
});
