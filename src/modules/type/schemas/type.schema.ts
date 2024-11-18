import { z } from "zod";
import {
  paginationSchema,
  idParamSchema,
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

// Schema para listar
export const listTypeSchema = z.object({
  query: paginationSchema,
});

// Schema para obtener y eliminar
export const getTypeSchema = z.object({
  params: idParamSchema,
});

// Schema para crear y actualizar
export const createTypeSchema = z.object({
  body: typeBodySchema,
});

export const updateTypeSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "El ID es requerido",
      invalid_type_error: "El ID debe ser un texto",
    }),
  }),
  body: typeBodySchema,
});
