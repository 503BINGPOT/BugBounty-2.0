import express from "express";

import passport from "passport";

import jwt from "jsonwebtoken";

import pool from "../config/db.js";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

/* NORMAL AUTH */
router.post("/register", registerUser);

router.post("/login", loginUser);

/* GITHUB LOGIN */
router.get(

  "/github",

  passport.authenticate(
    "github",
    {
      scope: ["user:email"],
    }
  )

);

/* GITHUB CALLBACK */
router.get(

  "/github/callback",

  passport.authenticate(
    "github",
    {
      session: false,
    }
  ),

  async (req, res) => {

    try {

      /* EXISTING USER */
      if (!req.user.isNewUser) {

        const token = jwt.sign(

          {
            id: req.user.id,

            username:
              req.user.username,

            role:
              req.user.role,

            avatar:
              req.user.avatar,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }

        );

        return res.redirect(

          `http://localhost:5173/auth-success?token=${token}`

        );

      }

      /* NEW USER */
      const tempToken = jwt.sign(

  {
    github_id:
      req.user.github_id,

    username:
      req.user.username,

    email:
      req.user.email,

    avatar:
      req.user.avatar,

    github_access_token:
      req.user.github_access_token,

    isNewUser: true,
  },
        process.env.JWT_SECRET,

        {
          expiresIn: "15m",
        }

      );

      return res.redirect(

        `http://localhost:5173/complete-profile?token=${tempToken}`

      );

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        message:
          "GitHub authentication failed",

      });

    }

  }

);

/* COMPLETE GITHUB PROFILE */
router.post(

  "/github/complete-profile",

  async (req, res) => {

    try {

      const {
        token,
        role,
      } = req.body;

      const decoded =
  jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  console.log(
  "DECODED TOKEN:",
  decoded
);

/* CHECK EMAIL ALREADY EXISTS */
const existingEmail =
  await pool.query(

    `
    SELECT * FROM users
    WHERE email = $1
    `,

    [decoded.email]

  );

if (existingEmail.rows.length > 0) {

  return res.status(400).json({

    message:
      "An account with this email already exists. Please log in normally.",

  });

}

console.log(
  "TOKEN GOING INTO DB:",
  decoded.github_access_token
);

/* INSERT NEW USER */
const newUser =
  await pool.query(

    `
    INSERT INTO users
(
  username,
  email,
  role,
  github_id,
  avatar,
  auth_provider,
  github_access_token
)

    VALUES
    ($1, $2, $3, $4, $5, $6, $7)

    RETURNING *
    `,

    [
  decoded.username,
  decoded.email,
  role,
  decoded.github_id,
  decoded.avatar,
  "github",
  decoded.github_access_token
]

  );

  console.log(
  "NEW USER:",
  newUser.rows[0]
);

      const user =
        newUser.rows[0];

      const finalToken =
        jwt.sign(

          {
            id: user.id,

            username:
              user.username,

            role:
              user.role,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }

        );

      return res.json({

        token: finalToken,

        user,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        message:
          "Failed to complete profile",

      });

    }

  }

);

export default router;