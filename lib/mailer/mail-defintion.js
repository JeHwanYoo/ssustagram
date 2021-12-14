/** 출처: 본인 https://github.com/lets-get-a-job/digicu-backend-server/blob/master/user-service/lib/mailer/mail-defintion.js */

const { sendMail } = require("./index");

/**
 *
 * @param {string} to mail address
 * @param {string} from mail address
 * @param {string} token
 */
function sendAuthEmail(to, from, userid, token, code) {
  sendMail({
    to,
    from,
    subject: "[슈스타그램] 가입 인증 메일",
    html: `
        <h1>가입을 진심으로 환영합니다.</h1>
        <p><a href="${process.env.BASE_URI}/api/auth/${userid}?token=${token}">여기</a>에 접속하여 인증 코드를 입력해주세요.</p>
        <p>code: ${code}</p>
        <p>SSUSTAGRAM 2021</p>
    `,
  })
    .then((res) => {
      if (process.env.NODE_ENV === "development") {
        console.log("메일 전송 성공");
        console.log(res);
      }
    })
    .catch((err) => {
      if (process.env.NODE_ENV === "development") {
        console.log("메일 전송 실패");
        console.log(err);
      }
    });
}

module.exports = {
  sendAuthEmail,
};
