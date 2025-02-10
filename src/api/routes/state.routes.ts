import { Router } from "express";

import {
  createState,
  getState,
  listStates,
  removeState,
  updateState,
} from "../controllers/state.controller";
import { validateSchema } from "../middlewares/validate-schema.middleware";
import {
  createStateSchema,
  deleteStateSchema,
  getAllStatesSchema,
  getStateSchema,
  updateStateSchema,
} from "../schemas/state.schema";

const router = Router();

router.post("/state", validateSchema(createStateSchema), createState);
router.get("/states", validateSchema(getAllStatesSchema), listStates);
router.get("/state/:id", validateSchema(getStateSchema), getState);
router.put("/state/:id", validateSchema(updateStateSchema), updateState);
router.delete("/state/:id", validateSchema(deleteStateSchema), removeState);

export default router;
