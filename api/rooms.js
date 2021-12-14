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
      const from = v.from;
      if (from.includes(user.userid)) {
        list.push({
          room_id: v.room_id,
          message: v.message,
          from: v.from,
        });
      }
    });

    for (let i = 0; i < list.length; i++) {
      const from = list[i].from;
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

router.get("/:room_id", async (req, res) => {
  try {
    const { user } = req.session.passport;
    const { room_id } = req.params;
    const room = await Rooms.findOne({
      where: {
        room_id,
      },
    });
    res.send({
      you: user.userid,
      room,
    });
  } catch (e) {
    sendErrorCode(res, e);
  }
});

router.post("/:room_id", async (req, res) => {
  try {
    const { user } = req.session.passport;
    const { room_id } = req.params;
    const { content } = req.body;
    const room = await Rooms.findOne({
      where: {
        room_id,
      },
    });

    const messages = room.messages;

    messages.push({
      content,
      from: user.userid,
    });

    await Rooms.update(
      {
        messages,
      },
      {
        where: {
          room_id,
        },
      }
    );

    res.send("ok");
  } catch (e) {
    console.log(e);
    sendErrorCode(res, e);
  }
});

export default router;
