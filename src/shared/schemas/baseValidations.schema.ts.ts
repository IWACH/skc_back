import { z } from "zod";

export const paginationSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
});

export const idParamSchema = z.object({
  id: z.string({
    required_error: "El ID es requerido",
    invalid_type_error: "El ID debe ser un texto",
  }),
});
