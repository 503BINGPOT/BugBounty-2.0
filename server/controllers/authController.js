import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import pool from "../config/db.js";


// REGISTER USER
export const registerUser = async (req, res) => {

  try {

    const {
      username,
      email,
      password,
      role,
    } = req.body;

    // CHECK IF USER EXISTS
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // INSERT USER
    const newUser = await pool.query(
      `
      INSERT INTO users
      (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        username,
        email,
        hashedPassword,
        role,
      ]
    );

    const user = newUser.rows[0];

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      token,
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};


// LOGIN USER
export const loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // FIND USER
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    // USER NOT FOUND
    if (result.rows.length === 0) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    const user = result.rows[0];

/* GITHUB ACCOUNT */
if (!user.password) {

  return res.status(400).json({

    githubUser: true,

    message:
      "This account was created using GitHub"

  });

}

/* CHECK PASSWORD */
const validPassword =
  await bcrypt.compare(
    password,
    user.password
  );

      

    if (!validPassword) {

      return res.status(400).json({
        message: "Invalid credentials",
      });

    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};