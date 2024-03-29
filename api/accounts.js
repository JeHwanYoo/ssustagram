import { Router } from "express";
import { Accounts, Auths, Profiles, Rooms } from "../models";
import bcrypt from "bcrypt";
import { sendErrorCode } from "./sendError";
import { sendAuthEmail } from "../lib/mailer/mail-defintion";
import randomstring from "randomstring";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

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
        const token = randomstring.generate(12);
        const code = randomstring.generate(6);

        Auths.create({
          userid,
          token,
          code,
          expired: moment().add(3, "minutes"),
        });

        Profiles.create({
          userid,
          avatar: null,
        });

        const accounts = await Accounts.findAll();
        const list = accounts.filter((v) => v.userid !== userid);

        list.forEach((v) => {
          Rooms.create({
            room_id: uuidv4(),
            from: [v.userid, userid],
            messages: [],
          });
        });

        sendAuthEmail(
          email,
          `"SSUSTAGRAM" <${process.env.SMTP_FROM}>`,
          userid,
          token,
          code
        );
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
