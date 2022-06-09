import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import { StatusCodes } from "http-status-codes";

const myOAuth2Client = new OAuth2Client(
  process.env.GOOGLE_MAILER_CLIENT_ID,
  process.env.GOOGLE_MAILER_CLIENT_SECRET
);
// Set Refresh Token into OAuth2Client Credentials
myOAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
});

export const sendEmail = async (req, res) => {
  try {
    const { email, subject, content } = req.body;
    if (!email || !subject || !content)
      throw new Error("Please provide email, subject and content!");

    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject.token;

    // Create transport from Nodemailer with full config -> call action send email
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.ADMIN_EMAIL_ADDRESS,
        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });

    const mailOptions = {
      to: email,
      subject: subject,
      html: `<h3>${content}</h3>`,
    };

    await transport.sendMail(mailOptions);
    res.status(StatusCodes.OK).json({ message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ errors: error.message });
  }
};
