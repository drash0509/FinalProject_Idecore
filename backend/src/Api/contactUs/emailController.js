const nodemailer = require("nodemailer");

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email is sent");
  } catch (e) {
    console.error(e);
  }
};

async function emailsending(req, res, next) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = await transporter.sendMail({
      from: {
        name: "Ayushi Akbari",
        address: process.env.USER,
      },
      to: req.body.email,
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    sendMail(transporter, mailOptions);
  } catch (e) {
    next(e);
  }
}

module.exports = { emailsending };
