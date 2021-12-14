/** 출처 본인: https://github.com/lets-get-a-job/digicu-backend-server/blob/master/user-service/lib/mailer/index.js */

"use strict";
const nodemailer = require("nodemailer");
const Mail = require("nodemailer/lib/mailer");
require("dotenv").config();

console.log({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SSL === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SSL === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 *
 * @callback SendMail
 * @param { Mail.Options } mailOptions
 * @returns { Promise<SentMessageInfo> }
 */

/**
 *
 * @type {SendMail}
 */
const sendMail = transporter.sendMail.bind(transporter);

module.exports = {
  sendMail,
};
