import { z } from "zod";

import {
  idParamSchema,
  paginationSchema,
} from "../../core/schemas/base-validation.schema";

const stateBodySchema = z.object({
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
  countryId: z
    .number({
      required_error: "El ID del país es requerido",
      invalid_type_error: "El ID del país debe ser un número",
    })
    .int("El ID del país debe ser un número entero"),
  active: z
    .boolean({
      required_error: "El estado activo es requerido",
      invalid_type_error: "El estado activo debe ser un booleano",
    })
    .default(true),
});

export const createStateSchema = z.object({
  body: stateBodySchema,
});

export const getAllStatesSchema = z.object({
  query: paginationSchema,
});

export const getStateSchema = z.object({
  params: idParamSchema,
});

export const updateStateSchema = z.object({
  params: idParamSchema,
  body: stateBodySchema.partial(),
});

export const deleteStateSchema = z.object({
  params: idParamSchema,
});
