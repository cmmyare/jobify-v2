import { Router } from "express";
const router = Router();
import { test } from "../controllers/testcontroller.js";

router.get("/tst", test);

export default router;
