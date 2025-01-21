import nodemailer from "nodemailer";
export const sendMail = async (req, res) => {
  const {videoUrl,email,name} = req.body;
  console.log(videoUrl,email,name);
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jugrajsingh46984@gmail.com",
      pass: "sbjfkhvpserozbqp",
    },
  });




  try {
   
    let info = await transporter.sendMail({
      from: "jugrajsingh46984@gmail.com", 
      to: email, 
      subject: "Link Of Your Appointment", 
      text: `Hey Mr./Ms. ${name} here is your link
      for your appointment with your Doctor.
      LINK:${videoUrl}`, 
      
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).send({ success: true, info });
  } catch (error) {
    console.log(error);
  }
};