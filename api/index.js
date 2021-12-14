import express from "express";
import { sequelize } from "../models";
import accounts from "./accounts";
import auth from "./auth";
import path from "path";
import login from "./login";
import passport from "passport";
import session from "express-session";
import passportConfig from "./passport";
import logout from "./logout";

require("dotenv").config();

const app = express();
app.use(express.json());
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

sequelize.sync();

app.use(
  session({ secret: "Hello, World", resave: true, saveUninitialized: false })
); // 세션 활성화
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use("/account", accounts);
app.use("/auth", auth);
app.use("/login", login);
app.use("/logout", logout);

module.exports = {
  path: "/api",
  handler: app,
};
