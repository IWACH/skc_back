import { Router } from "express";

import { validateSchema } from "../../../shared/errors/middleware/validate-schema.middleware";
import {
  createCountry,
  getCountry,
  listCountries,
  removeCountry,
  updateCountry,
} from "../controllers/country.controller";
import {
  createCountrySchema,
  deleteCountrySchema,
  getAllCountriesSchema,
  getCountrySchema,
  updateCountrySchema,
} from "../schemas/country.schema";

const router = Router();

router.post("/country", validateSchema(createCountrySchema), createCountry);
router.get("/countries", validateSchema(getAllCountriesSchema), listCountries);
router.get("/country/:id", validateSchema(getCountrySchema), getCountry);
router.put("/country/:id", validateSchema(updateCountrySchema), updateCountry);
router.delete(
  "/country/:id",
  validateSchema(deleteCountrySchema),
  removeCountry
);

export default router;
