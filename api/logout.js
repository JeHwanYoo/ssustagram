import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
  req.logout();
  res.send("ok");
});

export default router;
