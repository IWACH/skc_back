import { z } from "zod";
import {
  idParamSchema,
  paginationSchema,
} from "../../../shared/schemas/baseValidations.schema.ts";

const districtBodySchema = z.object({
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
  provinceId: z
    .number({
      required_error: "El ID de la provincia es requerido",
      invalid_type_error: "El ID de la provincia debe ser un número",
    })
    .int("El ID de la provincia debe ser un número entero"),
  active: z
    .boolean({
      required_error: "El estado activo es requerido",
      invalid_type_error: "El estado activo debe ser un booleano",
    })
    .default(true),
});

export const createDistrictSchema = z.object({
  body: districtBodySchema,
});

export const getAllDistrictsSchema = z.object({
  query: paginationSchema,
});

export const getDistrictSchema = z.object({
  params: idParamSchema,
});

export const updateDistrictSchema = z.object({
  params: idParamSchema,
  body: districtBodySchema.partial(),
});

export const deleteDistrictSchema = z.object({
  params: idParamSchema,
});
