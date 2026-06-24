import pool from "../config/db.js";

export const getDashboardStats =
async (req, res) => {

  try {

    const { userId } =
      req.params;

    const totalBounties =
      await pool.query(

        `
        SELECT COUNT(*)
        FROM bounties
        WHERE owner_id = $1
        `,

        [userId]

      );

    const openBounties =
      await pool.query(

        `
        SELECT COUNT(*)
        FROM bounties
        WHERE owner_id = $1
        AND status != 'Completed'
        `,

        [userId]

      );

    const completedBounties =
      await pool.query(

        `
        SELECT COUNT(*)
        FROM bounties
        WHERE owner_id = $1
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

      totalBounties:
        totalBounties.rows[0].count,

      openBounties:
        openBounties.rows[0].count,

      completedBounties:
        completedBounties.rows[0].count,

      repositories:
        repositories.rows[0].count,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Failed to fetch stats"

    });

  }

};