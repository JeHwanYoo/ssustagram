import { Router } from "express";
import passport from "passport";
const router = Router();

router.post("/", passport.authenticate("local"), async (req, res) => {
  res.send("ok");
});

router.get("/check", async (req, res) => {
  const passport = req.session.passport;
  if (passport && passport.user) {
    res.send("ok");
  } else {
    res.sendStatus(400);
  }
});

export default router;
