import express from "express";

import {
  getRepositories,
  connectRepository,
  getRepositoryIssues,
  importIssueAsBounty,
    githubWebhook,
} from "../controllers/githubController.js";

const router =
  express.Router();

router.get(
  "/repos/:userId",
  getRepositories
);

router.post(
  "/connect-repo",
  connectRepository
);

router.get(
  "/issues/:owner/:repo",
  getRepositoryIssues
);

router.post(
  "/import-issue",
  importIssueAsBounty
);

router.post(
  "/webhook",
  githubWebhook
);

export default router;