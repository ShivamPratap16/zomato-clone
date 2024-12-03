

import express from "express";
import { google } from "googleapis";
import twilio from "twilio";
import nodemailer from "nodemailer";

const router = express.Router();

// Twilio API setup (for Phone OTP)
const accountSid = ""; // Replace with your Twilio Account SID
const authToken = ""; // Replace with your Twilio Auth Token
const twilioClient = twilio(accountSid, authToken);

// Gmail API setup (for Email OTP)
const  CLIENT_ID="";     // Replace with your actual Client ID
 const CLIENT_SECRET= "";  // Replace with your actual Client Secret
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; // Use OAuth Playground for testing
const REFRESH_TOKEN =  ""; // Replace with your Gmail API refresh token

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Temporary in-memory storage for OTPs (use a database in production)
const otpStorage = {};

// Send OTP via Phone (Twilio)
router.post("/send-phone-otp", async (req, res) => {
  const { phone } = req.body;

  if (!phone || phone.length !== 10) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  otpStorage[phone] = { otp, createdAt: Date.now() }; // Store OTP with timestamp

  try {
    // Send OTP using Twilio
    await twilioClient.messages.create({
      body: `Your OTP is ${otp}`,
      from: "", // Replace with your Twilio number
      to: `+91${phone}`,
    });

    res.status(200).json({ message: "OTP sent successfully to phone" });
  } catch (error) {
    console.error("Error sending OTP to phone:", error.message);
    res.status(500).json({ message: "Failed to send OTP to phone" });
  }
});

// Send OTP via Email (Gmail API)
router.post("/send-email-otp", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  otpStorage[email] = { otp, createdAt: Date.now() }; // Store OTP with timestamp

  try {
    // Generate an access token for Gmail API
    const accessToken = await oAuth2Client.getAccessToken();

    // Configure Nodemailer for Gmail API
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "pratapop24@gmail.com", // Your Gmail address
        // pass: "ztib hwdj frmd ieoo", 
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Email message details
    const mailOptions = {
      from: "pratapop24@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
      html: `<strong>Your OTP is ${otp}</strong>`,
    };

    // Send OTP via email
    await transporter.sendMail(mailOptions);
 
    res.status(200).json({ message: "OTP sent successfully to email" });
  } catch (error) {
    console.error("Error sending OTP to email:", error.message);
    res.status(500).json({ message: "Failed to send OTP via email" });
  }
});

// Verify OTP for Phone or Email
router.post("/verify-otp", (req, res) => {
  const { identifier, otp } = req.body; // `identifier` can be phone or email

  if (!otpStorage[identifier]) {
    return res.status(400).json({ message: "No OTP request found for this identifier" });
  }

  const { otp: storedOtp, createdAt } = otpStorage[identifier];

  // OTP expiration logic (e.g., 5 minutes)
  const isExpired = Date.now() - createdAt > 5 * 60 * 1000;
  if (isExpired) {
    delete otpStorage[identifier];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (storedOtp === Number(otp)) {
    delete otpStorage[identifier]; // Clear OTP on successful verification
    return res.status(200).json({ message: "OTP verified successfully" });
  }

  return res.status(400).json({ message: "Invalid OTP" });
});

export const otpRoutes = router;
