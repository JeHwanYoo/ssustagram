/** 출처 zerocho */
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
import { Accounts } from "../models";
import bcrypt from "bcrypt";

module.exports = () => {
  passport.serializeUser((user, done) => {
    // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => {
    // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });

  passport.use(
    new LocalStrategy(
      {
        // local 전략을 세움
        usernameField: "userid",
        passwordField: "password",
        session: true, // 세션에 저장 여부
        passReqToCallback: false,
      },
      async (userid, password, done) => {
        try {
          const result = await Accounts.findOne({
            where: {
              userid,
            },
          });

          if (!result) {
            return done(null, false, { message: "Not Found" });
          }

          if (!result.email_auth) {
            return done(null, false, { message: "Not Email Checked" });
          }

          const user = {
            id: result.userid,
          };

          if (bcrypt.compareSync(password, result.password)) {
            done(null, user);
          } else {
            done(null, false, { message: "Password Not Matching" });
          }
        } catch (e) {
          done(e);
        }
      }
    )
  );
};
