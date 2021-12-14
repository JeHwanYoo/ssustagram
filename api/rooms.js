import { Router } from "express";
import { sendErrorCode } from "./sendError";
import { Accounts, Rooms } from "../models";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { user } = req.session.passport;
    const rooms = await Rooms.findAll();

    const list = [];

    rooms.forEach((v) => {
      const from = JSON.parse(v.from);
      if (from.includes(user.userid)) {
        list.push({
          room_id: v.room_id,
          message: v.message,
          from: v.from,
        });
      }
    });

    for (let i = 0; i < list.length; i++) {
      const from = JSON.parse(list[i].from);
      let index = from.indexOf(user.userid);

      if (index === 1) index = 0;
      else index = 1;

      const otherId = from[index];

      const other = await Accounts.findOne({
        where: {
          userid: otherId,
        },
      });

      list[i].name = other.name;
      list[i].userid = otherId;
    }

    res.send(list);
  } catch (e) {
    sendErrorCode(res, e);
  }
});

export default router;
