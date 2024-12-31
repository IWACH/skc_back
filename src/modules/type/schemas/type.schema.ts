import { z } from "zod";

import {
  idParamSchema,
  paginationSchema,
} from "../../../shared/schemas/baseValidations.schema.ts";

const typeBodySchema = z.object({
  type: z
    .string({
      required_error: "El tipo es requerido",
      invalid_type_error: "El tipo debe ser un texto",
    })
    .min(1, "El tipo no puede estar vacío"),
  value: z
    .string({
      required_error: "El valor es requerido",
      invalid_type_error: "El valor debe ser un texto",
    })
    .min(1, "El valor no puede estar vacío"),
  label: z
    .string({
      required_error: "La etiqueta es requerida",
      invalid_type_error: "La etiqueta debe ser un texto",
    })
    .min(1, "La etiqueta no puede estar vacía"),
});

export const listTypeSchema = z.object({
  query: paginationSchema,
});

export const getTypeSchema = z.object({
  params: idParamSchema,
});

export const createTypeSchema = z.object({
  body: typeBodySchema,
});

export const updateTypeSchema = z.object({
  params: idParamSchema,
  body: typeBodySchema.partial(),
});

export const deleteTypeSchema = z.object({
  params: idParamSchema,
});
