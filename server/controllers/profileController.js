import pool from "../config/db.js";

export const getProfileStats =
async (req, res) => {

  try {

    const { userId } =
      req.params;

    const applications =
      await pool.query(

        `
        SELECT COUNT(*)
        FROM applications
        WHERE applicant_id = $1
        `,

        [userId]

      );

    const completedBounties =
      await pool.query(

        `
        SELECT COUNT(*)
        FROM applications
        WHERE applicant_id = $1
        AND status = 'Completed'
        `,

        [userId]

      );

    const repositories =
      await pool.query(

        `
        SELECT COUNT(*)
        FROM repositories
        WHERE user_id = $1
        `,

        [userId]

      );

    res.json({

      applications:
        applications.rows[0].count,

      completedBounties:
        completedBounties.rows[0].count,

      repositories:
        repositories.rows[0].count,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Failed to fetch profile stats"

    });

  }

};