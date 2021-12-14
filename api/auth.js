import { Router } from "express";
import { sendErrorCode } from "./sendError";
import { EmailAuths, Accounts } from "../models";
const router = Router();

router.get("/:userid", async (req, res) => {
  const userid = req.params["userid"];
  const token = req.query["token"];

  if (!userid || !token) {
    sendErrorCode(res, new Error("Bad Request"));
    return;
  }

  const user = await EmailAuths.findOne({
    where: {
      userid,
      token,
    },
  });

  if (!user) {
    sendErrorCode(res, new Error("Bad Request"));
    return;
  }

  const now = Date.now();
  const expired = new Date(user.expired).valueOf();

  if (now > expired) {
    sendErrorCode(res, new Error("만료되었습니다."));
  }

  res.render("auth", {
    userid,
    token,
    BASE_URI: process.env.BASE_URI,
  });
});

router.post("/", async (req, res) => {
  const { userid, token, code } = req.body;

  try {
    const user = await EmailAuths.findOne({
      where: {
        userid,
        token,
        code,
      },
    });

    if (!user) {
      sendErrorCode(res, new Error("Bad Request"));
      return;
    }

    const now = Date.now();
    const expired = new Date(user.expired).valueOf();

    if (now <= expired) {
      await Accounts.update(
        {
          email_auth: true,
        },
        {
          where: {
            userid,
          },
        }
      );
      await EmailAuths.destroy({
        where: {
          userid,
        },
      });

      res.sendStatus(200);
    } else {
      sendErrorCode(res, new Error("만료되었습니다."));
    }
  } catch (e) {
    sendErrorCode(res, e);
  }
});

export default router;
