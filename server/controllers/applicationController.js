import pool from "../config/db.js";
import axios from "axios";

import createNotification from "../utils/createNotification.js";
/* CREATE APPLICATION */
export const createApplication = async (
  req,
  res
) => {

  try {

    const {
      bountyId,
      coverLetter,
    } = req.body;

    const applicantId = req.user.id;

    const result =
      await pool.query(

        `
        INSERT INTO applications
        (
          bounty_id,
          applicant_id,
          cover_letter
        )

        VALUES
        ($1, $2, $3)

        RETURNING *
        `,

        [
          bountyId,
          applicantId,
          coverLetter,
        ]

      );

      const bounty =
  await pool.query(

    `
    SELECT
      owner_id,
      title
    FROM bounties
    WHERE id = $1
    `,

    [bountyId]

  );

      await createNotification(

  bounty.rows[0].owner_id,

  `New application received for "${bounty.rows[0].title}"`

);

    res.status(201).json({

      message:
        "Application submitted",

      application:
        result.rows[0],

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Failed to apply",

    });

  }

};

/* GET APPLICATIONS FOR A BOUNTY */
export const getApplicationsForBounty =
  async (req, res) => {

    try {

      const { bountyId } =
        req.params;

      const ownerCheck =
        await pool.query(

          `
          SELECT owner_id
          FROM bounties
          WHERE id = $1
          `,

          [bountyId]

        );

      if (
        ownerCheck.rows.length === 0
      ) {

        return res.status(404).json({
          message:
            "Bounty not found",
        });

      }

      if (
        ownerCheck.rows[0].owner_id !==
        req.user.id
      ) {

        return res.status(403).json({
          message:
            "You are not the owner of this bounty",
        });

      }

      const result =
        await pool.query(

          `
          SELECT
            applications.*,
            users.username,
            users.email

          FROM applications

          JOIN users
          ON applications.applicant_id = users.id

          WHERE applications.bounty_id = $1

          ORDER BY applications.created_at DESC
          `,

          [bountyId]

        );

      res.json(
        result.rows
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch applications",
      });

    }

};

export const acceptApplication = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const application =
      await pool.query(

        `
        SELECT *
        FROM applications
        WHERE id = $1
        `,

        [id]

      );

    if (
      application.rows.length === 0
    ) {

      return res.status(404).json({
        message: "Application not found",
      });

    }

    const bountyId =
      application.rows[0].bounty_id;

    await pool.query(

      `
    UPDATE applications
    SET status = 'accepted',
    completed_at = NOW()
  WHERE id = $1
      `,

      [id]

    );

    await pool.query(

      `
      UPDATE applications
      SET status = 'Rejected'
      WHERE bounty_id = $1
      AND id != $2
      `,

      [bountyId, id]

    );

    await pool.query(

      `
      UPDATE bounties
      SET status = 'In Progress'
      WHERE id = $1
      `,

      [bountyId]

    );

    res.json({
      message: "Application accepted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to accept application",
    });

  }

  await createNotification(

  application.rows[0].applicant_id,

  "Your application has been accepted"

);

};

export const rejectApplication = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    await pool.query(

      `
      UPDATE applications
      SET status = 'Rejected'
      WHERE id = $1
      `,

      [id]

    );

    res.json({
      message: "Application rejected",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to reject application",
    });

  }

  const application =
  await pool.query(

    `
    SELECT *
    FROM applications
    WHERE id = $1
    `,

    [id]

  );

  await createNotification(

  application.rows[0].applicant_id,

  "Your application has been rejected"

);

};

export const getUserApplications =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      const result =
        await pool.query(

          `
          SELECT
  applications.*,
  bounties.title,
  bounties.reward,
  bounties.github_url,
  bounties.difficulty

FROM applications

JOIN bounties
ON applications.bounty_id =
   bounties.id

          WHERE applicant_id = $1

          ORDER BY applications.created_at DESC
          `,

          [userId]

        );

      res.json(
        result.rows
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch applications",
      });

    }

};

export const submitPR =
  async (req, res) => {

    try {

      const {
        applicationId,
        prUrl,
      } = req.body;

      const prNumber =
        prUrl.split("/").pop();

      const result =
        await pool.query(

          `
         UPDATE applications
SET
  pr_url = $1,
  pr_number = $2,
  status = 'PR Submitted'
WHERE id = $3

RETURNING *
          `,

          [
            prUrl,
            prNumber,
            applicationId
          ]

        );

        const application =
await pool.query(

`
SELECT
  a.applicant_id,
  b.owner_id,
  b.title

FROM applications a

JOIN bounties b
ON a.bounty_id = b.id

WHERE a.id = $1
`,

[applicationId]

);

await createNotification(

application.rows[0].owner_id,

`A pull request has been submitted for "${application.rows[0].title}"`

);

      res.json(
        result.rows[0]
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to submit PR"
      });

    }

    

};

export const checkPRStatus =
  async (req, res) => {

    try {

      const {
        applicationId
      } = req.params;

      const application =
        await pool.query(

          `
          SELECT
            a.*,
            b.github_url,
            b.owner_id
          FROM applications a
          JOIN bounties b
          ON a.bounty_id = b.id
          WHERE a.id = $1
          `,

          [applicationId]

        );

      const app =
        application.rows[0];

          if (!app.pr_url) {

  return res.status(400).json({

    message:
      "No PR submitted yet"

  });

}

     const prUrl =
  app.pr_url;

/*
https://github.com/503BINGPOT/BugBounty2.0/pull/1
*/

const parts =
  prUrl.split("/");

const owner =
  parts[3];

const repo =
  parts[4];

const prNumber =
  parts[6];

console.log({
  owner,
  repo,
  prNumber,
});

const response =
  await axios.get(

    `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`

  );



      const merged =
        response.data.merged;

      if (merged) {

        await pool.query(

          `
          UPDATE applications
SET
  status = 'Completed',
  completed_at = NOW()
WHERE id = $1
          `,

          [applicationId]

        );

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

        await createNotification(

app.applicant_id,

"🎉 Congratulations! Your pull request has been merged."

);

      }

      res.json({

        merged,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to check PR"

      });

    }

};