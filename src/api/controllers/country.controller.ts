import { createBaseController } from "./base/base.controller";
import { EntityType } from "../../domain/estities/entity.enum";

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
