import pool from "../config/db.js";

export const createBounty = async (req, res) => {

  try {

    const {
      title,
      description,
      acceptanceCriteria,
      reward,
      difficulty,
      skills,
      githubUrl,
      githubIssueId,
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
          skills,
          github_url,
          github_issue_id,
           owner_id
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
          skills,
          githubUrl,
          githubIssueId,
          ownerId,
        ]

      );

    res.status(201).json({
      message: "Bounty created",
      bounty: result.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to create bounty",
    });

  }

};

export const getAllBounties = async (req, res) => {

  try {

    const result =
      await pool.query(

        `
        SELECT *
        FROM bounties
        ORDER BY created_at DESC
        `

      );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch bounties",
    });

  }

};

export const getBountyById = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const result =
      await pool.query(

        `
        SELECT *
        FROM bounties
        WHERE id = $1
        `,

        [id]

      );

    if (
      result.rows.length === 0
    ) {

      return res.status(404).json({
        message: "Bounty not found",
      });

    }

    res.json(
      result.rows[0]
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed to fetch bounty",
    });

  }

};


export const getMyBounties =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      const result =
        await pool.query(

          `
          SELECT *
          FROM bounties
          WHERE owner_id = $1
          ORDER BY created_at DESC
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
          "Failed to fetch bounties",
      });

    }

};