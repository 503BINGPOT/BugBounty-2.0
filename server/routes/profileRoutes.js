import express from "express";

import {
  getProfileStats
}
from "../controllers/profileController.js";

const router =
  express.Router();

router.get(
  "/stats/:userId",
  getProfileStats
);

export default router;