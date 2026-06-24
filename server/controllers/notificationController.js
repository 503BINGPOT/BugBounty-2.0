import pool from "../config/db.js";

export const getNotifications =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      const result =
        await pool.query(

          `
          SELECT *
          FROM notifications
          WHERE user_id = $1
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
          "Failed"
      });

    }

};