import axios from "axios";
import pool from "../config/db.js";

export const getRepositories =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      const user =
        await pool.query(

          `
          SELECT github_access_token
          FROM users
          WHERE id = $1
          `,

          [userId]

        );

      if (
        user.rows.length === 0
      ) {

        return res.status(404).json({
          message: "User not found",
        });

      }

      const token =
        user.rows[0]
          .github_access_token;

      const response =
        await axios.get(

          "https://api.github.com/user/repos",

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );

      res.json(
        response.data
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch repositories",
      });

    }

};

export const connectRepository =
  async (req, res) => {

    try {

      const {
        userId,
        repoId,
        repoName,
        repoOwner,
        repoUrl,
      } = req.body;

      const result =
        await pool.query(

          `
          INSERT INTO repositories
          (
            user_id,
            repo_id,
            repo_name,
            repo_owner,
            repo_url
          )

          VALUES
          ($1,$2,$3,$4,$5)

          RETURNING *
          `,

          [
            userId,
            repoId,
            repoName,
            repoOwner,
            repoUrl,
          ]

        );

      res.status(201).json(
        result.rows[0]
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to connect repository",
      });

    }

};

export const getRepositoryIssues =
  async (req, res) => {

    try {

      const {
        owner,
        repo,
      } = req.params;

      const response =
        await axios.get(

          `https://api.github.com/repos/${owner}/${repo}/issues`

        );

      res.json(
        response.data
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch issues",
      });

    }

};

export const importIssueAsBounty =
  async (req, res) => {

    try {

      const {
  title,
  description,
  reward,
  difficulty,
  acceptanceCriteria,
  issueNumber,
  repoName,
  ownerId,
} = req.body;

      const result =
        await pool.query(

          `
          INSERT INTO bounties
(
  title,
  description,
  acceptance_criteria,
  reward,
  difficulty,
  owner_id,
  github_issue_id,
  github_url,
  status
)

          VALUES 
          ($1,$2,$3,$4,$5,$6,$7,$8,$9)

          RETURNING *
          `,

          [
  title,
  description,
  acceptanceCriteria,
  reward,
  difficulty,
  ownerId,
  issueNumber,
  repoName,
  "Open"
]

        );

      res.status(201).json(
        result.rows[0]
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to import issue",
      });

    }

};

export const githubWebhook = async (req, res) => {

  try {

    const payload = req.body;

    // Ignore everything except merged PRs
    if (
      payload.action !== "closed" ||
      !payload.pull_request?.merged
    ) {
      return res.sendStatus(200);
    }
    console.log("Webhook hit");
console.log("Action:", payload.action);
console.log("Merged:", payload.pull_request?.merged);

    const prNumber = payload.pull_request.number;
    console.log("PR Number:", prNumber);

    // Find application
    const application =
      await pool.query(

        `
        SELECT *
        FROM applications
        WHERE pr_number = $1
        `,

        [prNumber]

      );

      console.log("Applications found:", application.rows.length);
console.log(application.rows);

    if (
      application.rows.length === 0
    ) {

      return res.sendStatus(200);

    }

    const app =
      application.rows[0];

    // Complete application
    await pool.query(

      `
      UPDATE applications

      SET

        status = 'Completed',
        completed_at = NOW()

      WHERE id = $1
      `,

      [app.id]

    );

    // Complete bounty
    await pool.query(

      `
      UPDATE bounties

      SET

        status = 'Completed',
        completed_at = NOW()

      WHERE id = $1
      `,

      [app.bounty_id]

    );

    // Get owner + applicant
    const bounty =
      await pool.query(

        `
        SELECT
          owner_id,
          title
        FROM bounties
        WHERE id = $1
        `,

        [app.bounty_id]

      );

    await createNotification(

      app.applicant_id,

      `🎉 Your pull request was merged for "${bounty.rows[0].title}"`

    );

    await createNotification(

      bounty.rows[0].owner_id,

      `✅ Bounty "${bounty.rows[0].title}" has been completed.`

    );

    console.log(
      "Webhook processed successfully"
    );

    res.sendStatus(200);

  } catch (error) {

    console.log(error);

    res.sendStatus(500);

  }

};