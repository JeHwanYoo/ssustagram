import express from "express";
import { sequelize } from "../models/";

const app = express();
app.use(express.json());

app.get("/get", function (req, res) {
  res.send("foo");
});

module.exports = {
  path: "/api",
  handler: app,
};
