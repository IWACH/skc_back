import { Router } from "express";

import countryRoutes from "../routes/country.routes";
import typeRoutes from "../routes/type.routes";
import stateRoutes from "../routes/state.routes";
import provinceRoutes from "../routes/province.routes";
import districtRoutes from "../routes/district.routes";

const router = Router();

// Combine all routes
router.use(typeRoutes);
router.use(countryRoutes);
router.use(stateRoutes);
router.use(provinceRoutes);
router.use(districtRoutes);
export default router;
