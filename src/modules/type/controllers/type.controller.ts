import { createBaseController } from "../../base/baseController";

const typeController = createBaseController("type", {
  searchFields: ["type", "value", "label"],
  excludedFields: ["createdAt", "updatedAt"],
  defaultInclude: {}, // Puedes agregar relaciones si las necesitas
});

export const { list, get, create, update, remove } = typeController;
