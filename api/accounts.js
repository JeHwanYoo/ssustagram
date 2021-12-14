import { Router } from "express";
import { Accounts } from "../models";

const router = Router();

/*
가입 요청	/account
userid 중복 확인	/users/:userid
이메일 중복 확인	/emails/:email
*/

/** userid 중복확인 */
router.get("/users/:userid", async (req, res) => {
  const userid = req.params["userid"];

  try {
    const accounts = await Accounts.findAll();
    res.send("doo");
  } catch (e) {
    res.status(400);
    res.send(e);
  }
});

/** 이메일 중복확인 */
/** 가입 요청 */

export default router;
