import { Router } from "express";

import countryRoutes from "../modules/country/routes/country.routes";
import typeRoutes from "../modules/type/routes/type.routes";
import stateRoutes from "../modules/state/routes/state.routes";
import provinceRoutes from "../modules/province/routes/province.routes";

const router = Router();

// Combine all routes
router.use(typeRoutes);
router.use(countryRoutes);
router.use(stateRoutes);
router.use(provinceRoutes);
export default router;
