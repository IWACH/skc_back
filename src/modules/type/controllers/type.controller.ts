import { createBaseController } from "../../base/baseController";
import { EntityType } from "../../../models/entity.enum";

const typeController = createBaseController(EntityType.TYPE, {
  searchFields: ["type", "value", "label"],
  excludedFields: ["createdAt", "updatedAt"],
  defaultInclude: {},
});

export const { list, get, create, update, remove } = typeController;
