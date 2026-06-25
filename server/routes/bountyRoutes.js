import express from "express";


import {
  createBounty,
  getAllBounties,
  getBountyById,
  getMyBounties,
  updateBounty,
} from "../controllers/bountyController.js";

import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
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

router.put(

  "/:id",

  verifyToken,

  updateBounty

);


export default router;