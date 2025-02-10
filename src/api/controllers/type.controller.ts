import { createBaseController } from "./base/base.controller";
import { EntityType } from "../../domain/estities/entity.enum";

const typeController = createBaseController(EntityType.TYPE, {
  searchFields: ["type", "value", "label"],
  excludedFields: ["createdAt", "updatedAt"],
  defaultInclude: {},
});

export const { list, get, create, update, remove } = typeController;
