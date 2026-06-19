import express from "express";


import {
  createBounty,
  getAllBounties,
  getBountyById,
  getMyBounties,
} from "../controllers/bountyController.js";

const router = express.Router();

router.post(
  "/",
  createBounty
);

router.get(
  "/",
  getAllBounties
);

router.get(
  "/owner/:userId",
  getMyBounties
);

router.get(
  "/:id",
  getBountyById
);


export default router;