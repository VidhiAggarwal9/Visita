
import express from "express";
import { sampleAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();
router.post("/sample", sampleAnalytics);
export default router;

