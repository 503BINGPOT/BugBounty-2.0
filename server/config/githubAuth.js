import passport from "passport";

import dotenv from "dotenv";

dotenv.config();

import { Strategy as GitHubStrategy }
from "passport-github2";

import pool from "./db.js";

console.log(
  "CLIENT ID:",
  process.env.GITHUB_CLIENT_ID
);

passport.use(

  new GitHubStrategy(

    {
      clientID:
        process.env.GITHUB_CLIENT_ID,

      clientSecret:
        process.env.GITHUB_CLIENT_SECRET,

      callbackURL:
        "${import.meta.env.VITE_API_URL}/api/auth/github/callback",
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {

      console.log(
  "GITHUB TOKEN:",
  accessToken
);

      try {

        const githubId =
          profile.id;

        const username =
          profile.username;

        const email =
          profile.emails?.[0]?.value;

        const avatar =
          profile.photos?.[0]?.value;

        /* CHECK EXISTING USER */
        const existingUser =
          await pool.query(

            `
            SELECT * FROM users
            WHERE github_id = $1
            `,

            [githubId]

          );

        /* USER EXISTS */
        if (
  existingUser.rows.length > 0
) {

  await pool.query(

    `
    UPDATE users
    SET github_access_token = $1
    WHERE id = $2
    `,

    [
      accessToken,
      existingUser.rows[0].id
    ]

  );

  const updatedUser =
    await pool.query(

      `
      SELECT *
      FROM users
      WHERE id = $1
      `,

      [
        existingUser.rows[0].id
      ]

    );

  return done(
    null,
    updatedUser.rows[0]
  );

}

        /* NEW USER */
       const newUser = {

  github_id: githubId,

  username,

  email,

  avatar,

  github_access_token:
    accessToken,

  isNewUser: true,

};
        return done(
          null,
          newUser
        );

      } catch (error) {

        return done(error, null);

      }

    }

  )

);

passport.serializeUser(
  (user, done) => {

    done(null, user);

  }
);

passport.deserializeUser(
  (user, done) => {

    done(null, user);

  }
);