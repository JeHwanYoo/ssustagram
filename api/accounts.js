import { Router } from "express";
import { Accounts } from "../models";
import bcrypt from "bcrypt";
import randomstring from "randomstring";

const router = Router();

/** userid 중복확인 */
router.get("/users/:userid", async (req, res) => {
  const userid = req.params["userid"];

  try {
    const accounts = await Accounts.findOne({
      where: {
        userid,
      },
    });
    if (accounts.length > 0) {
      res.send({ result: true });
    } else {
      res.send({ result: false });
    }
  } catch (e) {
    res.status(400);
    res.send(e);
  }
});

/** 이메일 중복확인 */
router.get("/emails/:email", async (req, res) => {
  const email = req.params["email"];

  try {
    const accounts = await Accounts.findOne({
      where: {
        email,
      },
    });
    if (accounts.length > 0) {
      res.send({ result: true });
    } else {
      res.send({ result: false });
    }
  } catch (e) {
    res.status(400);
    res.send(e);
  }
});

/** 가입 요청 */
router.post("/", (req, res) => {
  const { userid, email, name, password } = req.body;

  bcrypt.hash(password, 10, async (err, salt) => {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    try {
      const account = await Accounts.create({
        userid,
        email,
        name,
        password,
      });
      if (account) {
        res.sendStatus(200);
      } else {
        res.status(400);
        res.send(e);
      }
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  });
});

export default router;
