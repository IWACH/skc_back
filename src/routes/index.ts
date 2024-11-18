import { Router } from "express";
import typeRoutes from "../modules/type/routes/type.routes";

const router = Router();

// Combinar todas las rutas
router.use(typeRoutes);

export default router;
