import { Router } from "express";
import { sendErrorCode } from "./sendError";
import { sequelize } from "../models";
const router = Router();

/**
 * GET /posts?query={q}&type={a | t | h}&limit={n}&page={n}
 */

router.get("/", async (req, res) => {
  try {
    // let { q, type, limit, page } = req.params;
    const { user } = req.session.passport;

    // imgid: "0",
    // userid: "qwer0000",
    // files: [
    //   "https://via.placeholder.com/600x600/abcd123456/808080",
    //   "https://via.placeholder.com/600x600/00FFFF/808080",
    //   "https://via.placeholder.com/600x600/0000FF/808080",
    // ],
    // text: "이것은 #더미데이터 입니다. #해시태그 테스트",
    // hashtags: ["#더미데이터", "#해시태그"],
    // created_at: Date.now(),
    // updated_at: Date.now(),
    // name: "나임",
    // me: true,

    let sql =
      "SELECT imgid, Images.userid, name, files, text, hashtags, Images.created_at as created_at, Images.updated_at as updated_at FROM Images JOIN Accounts USING(userid)";

    const result = await sequelize.query(sql);

    for (let i = 0; i < result[0].length; i++) {
      result[0][i].me = user.userid === result[0][i].userid;
    }

    res.send(result[0]);
  } catch (e) {
    sendErrorCode(res, e);
  }
});

export default router;
