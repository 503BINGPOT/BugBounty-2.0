import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import bountyRoutes from "./routes/bountyRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import notificationRoutes from "./routes/notificationRoute.js";

/* LOAD ENV */

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

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);

app.use(
  "/api/payment",
  paymentRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

/* START SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
