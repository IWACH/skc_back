import { Router } from "express";

import {
  createDistrict,
  getDistrict,
  listDistricts,
  removeDistrict,
  updateDistrict,
} from "../controllers/district.controller";
import { validateSchema } from "../middlewares/validate-schema.middleware";
import {
  createDistrictSchema,
  deleteDistrictSchema,
  getAllDistrictsSchema,
  getDistrictSchema,
  updateDistrictSchema,
} from "../schemas/district.schema";

const router = Router();

router.post("/district", validateSchema(createDistrictSchema), createDistrict);
router.get("/districts", validateSchema(getAllDistrictsSchema), listDistricts);
router.get("/district/:id", validateSchema(getDistrictSchema), getDistrict);
router.put(
  "/district/:id",
  validateSchema(updateDistrictSchema),
  updateDistrict
);
router.delete(
  "/district/:id",
  validateSchema(deleteDistrictSchema),
  removeDistrict
);

export default router;
