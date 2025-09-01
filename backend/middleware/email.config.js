import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "sudarshan2004yadav@gmail.com",
    pass: "hspu lobb mieu vznf",
  },
});
const sendMail = async () => {
    try {
    const info = await transporter.sendMail({
    from: '"ZestyBites." <sudarshan2004yadav@gmail.com>',
    to: "9920freefire@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
    
  });
    } catch (error) {
        console.log(error);
    }
}
 sendMail();
