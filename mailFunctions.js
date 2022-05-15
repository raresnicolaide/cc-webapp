const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "reina.senger93@ethereal.email",
    pass: "wSfSn21UnZHaC7hZHn",
  },
});

const sendMail = async (sender, subject, msg) => {
  const mg = `
        Email: ${sender}\r\n
        Message: ${msg}
    `;

  const message = {
    from: `${sender}`,
    to: "reina.senger93@ethereal.email",
    subject: `${subject}`,
    text: `${mg}`,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  sendMail,
};
