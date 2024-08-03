// const nodemailer = require("nodemailer");

// const mailSender = async (email,title,body) => {
//     try{
//         let transporter = nodemailer.createTransport({
//             host:process.env.MAIL_HOST,
//             auth:{
//                 user:process.env.MAIL_USER,
//                 pass:process.env.MAIL_PASS,
//             },
//         });
        
//         let info = await transporter.sendMail({
//             from:'StudyNotion || Edtech Platform',
//             to:`${email}`,
//             subject:`${title}`,
//             html:`${body}`,
//         });
//         console.log(info);
//         return info;

//     }
//     catch(error){
//         console.log(error.message);
//     }
// }

// module.exports = mailSender;

const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT || 587, // Use a default port if not set
      secure: process.env.MAIL_SECURE === 'true', // true for port 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: 'Etude || Edtech Platform" <no-reply@studynotion.com>', // use a valid sender address
      to: email,
      subject: title,
      html: body,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error; // Rethrow the error after logging it
  }
};

module.exports = mailSender;
