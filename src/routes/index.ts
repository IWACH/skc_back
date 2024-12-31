import { Router } from "express";

import countryRoutes from "../modules/country/routes/country.routes";
import typeRoutes from "../modules/type/routes/type.routes";

const router = Router();

// Combine all routes
router.use(typeRoutes);
router.use(countryRoutes);

export default router;
