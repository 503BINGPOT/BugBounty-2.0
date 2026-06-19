import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";

import authRoutes from "./routes/authRoutes.js";
import bountyRoutes from "./routes/bountyRoutes.js";

import applicationRoutes from "./routes/applicationRoutes.js";

import githubRoutes
from "./routes/githubRoutes.js";

/* LOAD ENV */
dotenv.config();

/* LOAD PASSPORT GITHUB STRATEGY */
await import("./config/githubAuth.js");

const app = express();

app.use(express.json());

/* MIDDLEWARE */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);




app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());

/* ROUTES */
app.use("/api/auth", authRoutes);

app.use(
  "/api/applications",
  applicationRoutes
);

app.use("/api/bounties", bountyRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use(
  "/api/github",
  githubRoutes
);

/* START SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});