'use strict';

const Email = require('email-templates');
const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const moment = require('moment')

const mailgunOptions = {
  auth: {
    api_key:
      process.env.EMAIL_API_KEY || 'key-eeac6a89becd0c257ede043e421760ea',
    domain: process.env.EMAIL_DOMAIN || 'dev-email.enouvo.com'
  }
};
const emailFrom = process.env.EMAIL_FROM || 'phanle.ripper@gmail.com';
const transport = mailgunTransport(mailgunOptions);
const emailClient = nodemailer.createTransport(transport);
const email = new Email({
  message: {
    from: emailFrom
  },
  send: true,
  transport: emailClient
});


const transporterMobile = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'phanle.ripper@gmail.com',
    pass: process.env.GMAIL_PASSWORD || 'chinhchinh99'
  }
});

async function sendEmailResetPasswordMobile(receiverEmail, data) {
  try {
    const mailOptions = {
      from: '"TCRM" <phanle.ripper@gmail.com>', // sender address
      to: receiverEmail, // list of receivers
      subject: 'Reset password request', // Subject line
      html:
      `<p>Click this link to reset your password <a href=${data} target="_blank">Click here</a></p>`
    };

    await transporterMobile.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
}

async function sendEmailResetPassword(receiverEmail, resetPasswordUrl) {
  try {
    const mailOptions = {
      from: '"TCRM" <info@enouvo.com>', // sender address
      to: receiverEmail, // list of receivers
      subject: 'Reset password request', // Subject line
      html: `<p>Click this link to reset your password <a href=${resetPasswordUrl} target="_blank">Click here</a></p>` // html body
    };

    const result = await emailClient.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
}

async function sendInvitationEmail(receiverEmail, inviteUrl) {
  try {
    const mailOptions = {
      from: '"TCRM" <info@enouvo.com>', // sender address
      to: receiverEmail, // list of receivers
      subject: 'Invite member to tcrm', // Subject line
      html: `<p>Click this link to join us <a href=${inviteUrl} target="_blank">Click here</a></p>` // html body
    };

    const result = await emailClient.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function sendEmailTransactionByDay(receiverEmail, data) {
  try {
    let sum = 0
    data.transactionIn.length > 0 && data.transactionIn.map(item => sum += item.amount)
    data.transactionOut.length > 0 && data.transactionOut.map(item => sum -= item.amount)
    const mailOptions = {
      from: '"APP quản lý chi tiêu" <moman@gmail.com>', // sender address
      to: receiverEmail, // list of receivers
      subject: `Email store transaction by day (${moment().format('DD-MM-YYYY')})`, // Subject line
      html:
      `<p>Đây là thống kê chi tiêu hằng ngày của bạn</p>
      <br/>
      <h3>Thu nhập:</h3><br/>
      ${data.transactionIn.length === 0 ? '<p>Không có thu nhập trong hôm nay</p>' : "" }
      ${data.transactionIn.map(item => `<p>${item.description}:  ${item.amount} VND</p>`)}
      <h3>Chi tiêu:</h3><br/>
      ${data.transactionOut.length === 0 ? '<p>Không có chi tiêu trong hôm nay</p>': ""}
      ${data.transactionOut.map(item => `<p>${item.description}:  ${item.amount} VND</p>`)}
      <h2 style="font-size:30; font-style: italic">Tổng: ${sum} VND</h2>
      `
    };
    await transporterMobile.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  sendEmailResetPassword,
  sendInvitationEmail,
  sendEmailResetPasswordMobile,
  sendEmailTransactionByDay
}
