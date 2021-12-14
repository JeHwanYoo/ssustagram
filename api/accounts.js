import { Router } from "express";
import { Accounts } from "../models";
import bcrypt from "bcrypt";
import { sendErrorCode } from "./sendError";

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
    if (accounts) {
      res.send({ result: true });
    } else {
      res.send({ result: false });
    }
  } catch (e) {
    sendErrorCode(res, e);
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
    if (accounts) {
      res.send({ result: true });
    } else {
      res.send({ result: false });
    }
  } catch (e) {
    sendErrorCode(res, e);
  }
});

/** 가입 요청 */
router.post("/", (req, res) => {
  const { userid, email, name, password } = req.body;

  bcrypt.hash(password, 10, async (err, hash) => {
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
        password: hash,
        email_auth: false,
      });
      if (account) {
        res.sendStatus(200);
      } else {
        sendErrorCode(res, e);
      }
    } catch (e) {
      sendErrorCode(res, e);
    }
  });
});

export default router;
