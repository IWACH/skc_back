import { z } from "zod";

export const typeSchema = z.object({
  body: z.object({
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
  }),
});
