import { Router } from "express";
import { sendErrorCode } from "./sendError";
import { Accounts, Follows } from "../models";
const router = Router();

router.post("/:userid", async (req, res) => {
  try {
    const { user } = req.session.passport;
    const { userid } = req.params;

    Follows.create({
      from_id: user.userid,
      to_id: userid,
    });

    res.send("ok");
  } catch (e) {
    sendErrorCode(res, e);
  }
});

router.delete("/:userid", async (req, res) => {
  try {
    const { user } = req.session.passport;
    const { userid } = req.params;

    Follows.destroy({
      where: {
        from_id: user.userid,
        to_id: userid,
      },
    });

    res.send("ok");
  } catch (e) {
    sendErrorCode(res, e);
  }
});

router.get("/list", async (req, res) => {
  try {
    const { user } = req.session.passport;

    const accounts = await Accounts.findAll();
    const follows = await Follows.findAll({
      where: {
        from_id: user.userid,
      },
    });

    const list = [];

    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].userid !== user.userid) {
        list.push({
          userid: accounts[i].userid,
          name: accounts[i].name,
          avatar: "",
          following: false,
        });
      }
    }

    for (let i = 0; i < list.length; i++) {
      follows.forEach((v) => {
        if (list[i].userid === v.to_id) {
          list[i].following = true;
        } else {
          list[i].following = false;
        }
      });
    }
    res.send(list);
  } catch (e) {
    sendErrorCode(res, e);
  }
});

export default router;
