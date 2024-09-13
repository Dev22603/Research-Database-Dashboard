import { Router } from "express";

import { getConferencePaper } from "../controllers/allControllers.mjs";

const router = Router();

// Conference Paper route with filters
router.get("/conferencePaper", getConferencePaper);

export default router;
