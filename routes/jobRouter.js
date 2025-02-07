import { Router } from "express";
const route = Router();
import {
  getAlljobs,
  getJob,
  showStats,
  createJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
route.get("/", getAlljobs);
route.post("/", checkForTestUser, validateJobInput, createJobs);
route.get("/stats", showStats);
route.get("/:id", checkForTestUser, validateIdParam, getJob);
route.patch(
  "/:id",
  checkForTestUser,
  validateJobInput,
  validateIdParam,
  updateJob
);
route.delete("/:id", checkForTestUser, validateIdParam, deleteJob);

// router.route("/").get(getAlljobs).post(createJobs);
// router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

export default route;
