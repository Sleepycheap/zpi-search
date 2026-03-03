import express from "express";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import axios from "axios";
import { appendFile } from "node:fs";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
// import { getUser, createUser, loginUser } from './userDB.js';
import { getUsers, createUser, getOneUser } from "./db/queries.js";
import displayRouter from "./routes/displayRouter.js";
import searchRouter from "./routes/searchRouter.js";
import { searchResults } from "./controllers/searchController.js";
import { pool } from "./db/pool.js";

const dirname = fileURLToPath(new URL(".", import.meta.url));
const filePath = join(dirname, "views");
const assetsPath = join(dirname, "public");
const utilPath = join(dirname, "utils");
const dbPath = join(dirname, "db");
const app = express();

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set("views", filePath);
app.set("view engine", "ejs");
app.use(session({ secret: "otter", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

async function checkAdmin(username) {
  const user = await getOneUser(username);
  if (user.username === "Admin") {
    return true;
  } else {
    return false;
  }
}

app.post("/log-in", async (req, res) => {
  const user = req.body.username;
  const loginUser = process.env.LOGIN_UN;
  const loginPw = await bcrypt.hash(process.env.LOGIN_PW, 10);
  const match = await bcrypt.compare(req.body.password, loginPw);
  if (match && user === loginUser) {
    res.render("display", {
      admin: true,
    });
  } else {
    res.render("login-error");
  }
});

app.get("/login-error", (req, res) => res.render("login-error"));

const port = 8000;

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`ZPI Search running on port: ${port}`);
});

app.use("/", displayRouter);
app.use("/search", searchRouter);
