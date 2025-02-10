import { Router } from "express";

import {
  create,
  get,
  list,
  remove,
  update,
} from "../controllers/type.controller";
import { validateSchema } from "../middlewares/validate-schema.middleware";
import {
  createTypeSchema,
  deleteTypeSchema,
  getTypeSchema,
  listTypeSchema,
  updateTypeSchema,
} from "../schemas/type.schema";

const router = Router();

router.get("/types", validateSchema(listTypeSchema), list);
router.get("/type/:id", validateSchema(getTypeSchema), get);
router.post("/type", validateSchema(createTypeSchema), create);
router.put("/type/:id", validateSchema(updateTypeSchema), update);
router.delete("/type/:id", validateSchema(deleteTypeSchema), remove);

export default router;
