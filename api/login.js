import { Router } from "express";
import passport from "passport";
const router = Router();

router.post("/", passport.authenticate("local"), async (req, res) => {
  res.send("ok");
});

export default router;
