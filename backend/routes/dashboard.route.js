import express from "express";
import Auth from "../middleware/auth.middleware.js";
import { index } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.route("/").get(index);

export default router;
