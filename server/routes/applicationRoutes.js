import express from "express";

import authMiddleware
from "../middleware/authMiddleware.js";
import {
  createApplication,
  getApplicationsForBounty,
  acceptApplication,
  rejectApplication,
  getUserApplications,
  submitPR,
  checkPRStatus
} from "../controllers/applicationController.js";

const router = express.Router();

router.post(
  "/",
  createApplication
);

router.get(
  "/:bountyId",
  authMiddleware,
  getApplicationsForBounty
);

router.put(
  "/accept/:id",
  authMiddleware,
  acceptApplication
);

router.put(
  "/reject/:id",
  authMiddleware,
  rejectApplication
);

router.get(
  "/user/:userId",
  getUserApplications
);

router.put(
  "/submit-pr",
  submitPR
);

router.get(
  "/check-pr/:applicationId",
  checkPRStatus
);

export default router;