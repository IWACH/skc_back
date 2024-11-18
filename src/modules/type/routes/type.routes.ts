import { Router } from "express";

import { validateSchema } from "../../../shared/middleware/validateSchema";
import {
  create,
  get,
  list,
  remove,
  update,
} from "../controllers/type.controller";
import { typeSchema } from "../schemas/type.schema";

const router = Router();

router.get("/type", list);
router.get("/type/:id", get);
router.post("/type", validateSchema(typeSchema), create);
router.put("/type/:id", validateSchema(typeSchema), update);
router.delete("/type/:id", remove);

export default router;
