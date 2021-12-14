import { Router } from "express";
import { Follows } from "../models";
const router = Router();

router.get("/", async (req, res) => {
  const passport = req.session.passport;
  if (passport && passport.user) {
    const { userid, name } = passport.user;

    const follows = await Follows.findAll({
      where: {
        from_id: userid,
      },
    });

    const followers = await Follows.findAll({
      where: {
        to_id: userid,
      },
    });

    const n_follows = follows ? follows.length : 0;
    const n_followers = followers ? followers.length : 0;

    res.send({
      userid,
      name,
      n_follows,
      n_followers,
    });
  } else {
    res.sendStatus(400);
  }
});

export default router;
