import express from "express";
import { sequelize } from "../models";
import accounts from "./accounts";
import auth from "./auth";
import path from "path";
require("dotenv").config();

const app = express();
app.use(express.json());
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

sequelize.sync();

app.use("/account", accounts);
app.use("/auth", auth);

module.exports = {
  path: "/api",
  handler: app,
};
