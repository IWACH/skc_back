import { z } from "zod";

import {
  idParamSchema,
  paginationSchema,
} from "../../core/schemas/base-validation.schema";

const provinceBodySchema = z.object({
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
    .max(5, "El código no puede exceder los 5 caracteres")
    .optional(),
  stateId: z
    .number({
      required_error: "El ID del estado es requerido",
      invalid_type_error: "El ID del estado debe ser un número",
    })
    .int("El ID del estado debe ser un número entero"),
  active: z
    .boolean({
      required_error: "El estado activo es requerido",
      invalid_type_error: "El estado activo debe ser un booleano",
    })
    .default(true),
});

export const createProvinceSchema = z.object({
  body: provinceBodySchema,
});

export const getAllProvincesSchema = z.object({
  query: paginationSchema,
});

export const getProvinceSchema = z.object({
  params: idParamSchema,
});

export const updateProvinceSchema = z.object({
  params: idParamSchema,
  body: provinceBodySchema.partial(),
});

export const deleteProvinceSchema = z.object({
  params: idParamSchema,
});
