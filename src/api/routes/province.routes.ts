import { Router } from "express";

import {
  createProvince,
  getProvince,
  listProvinces,
  removeProvince,
  updateProvince,
} from "../controllers/province.controller";
import { validateSchema } from "../middlewares/validate-schema.middleware";
import {
  createProvinceSchema,
  deleteProvinceSchema,
  getAllProvincesSchema,
  getProvinceSchema,
  updateProvinceSchema,
} from "../schemas/province.schema";

const router = Router();

router.post("/province", validateSchema(createProvinceSchema), createProvince);
router.get("/provinces", validateSchema(getAllProvincesSchema), listProvinces);
router.get("/province/:id", validateSchema(getProvinceSchema), getProvince);
router.put(
  "/province/:id",
  validateSchema(updateProvinceSchema),
  updateProvince
);
router.delete(
  "/province/:id",
  validateSchema(deleteProvinceSchema),
  removeProvince
);

export default router;
