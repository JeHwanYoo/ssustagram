import { Router } from "express";

const router = Router();

/*
가입 요청	/account
userid 중복 확인	/users/:userid
이메일 중복 확인	/emails/:email
*/

/** userid 중복확인 */
router.get("/users/:userid", (req, res) => {
  const userid = req.params["userid"];
});

/** 이메일 중복확인 */
/** 가입 요청 */
