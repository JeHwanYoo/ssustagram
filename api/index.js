import express from "express";
import { sequelize } from "../models";
import accounts from "./accounts";

const app = express();
app.use(express.json());

sequelize.sync();

app.use("/account", accounts);

module.exports = {
  path: "/api",
  handler: app,
};
