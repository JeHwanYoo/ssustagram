import { Router } from "express";
import { Images } from "../models";
import { v4 as uuidv4 } from "uuid";
import { sendErrorCode } from "./sendError";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { files, text } = req.body;
    const passport = req.session.passport;

    if (passport && passport.user) {
      const { userid } = passport.user;

      const regexp = /\#([0-9a-zA-Z가-힣]*)/g;
      const matched = [...text.matchAll(regexp)];
      const hashtags = [];

      for (const m of matched) {
        hashtags.push(m[0]);
      }

      Images.create({
        imgid: uuidv4(),
        userid,
        files,
        text,
        hashtags,
      });

      res.send("ok");
    }
  } catch (e) {
    sendErrorCode(res, e);
  }
});

export default router;
