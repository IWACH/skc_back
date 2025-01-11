import { createBaseController } from "../../base/baseController";
import { EntityType } from "../../../models/entity.enum";

const countryController = createBaseController(EntityType.COUNTRY, {
  searchFields: ["name", "code"],
  excludedFields: ["createdAt", "updatedAt"],
});

export const {
  list: listCountries,
  get: getCountry,
  create: createCountry,
  update: updateCountry,
  remove: removeCountry,
} = countryController;
