

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