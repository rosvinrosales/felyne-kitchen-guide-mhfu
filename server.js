import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_PASS;

if (!gmailUser || !gmailPass) {
  console.warn(
    "GMAIL_USER or GMAIL_PASS is not set. Email sending will fail until these are configured."
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});

app.post("/api/contact", async (req, res) => {
  const { email, message } = req.body ?? {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    await transporter.sendMail({
      from: gmailUser,
      to: gmailUser,
      subject: "New message from Felyne Kitchen Guide contact form",
      text: `From: ${email || "no email provided"}\n\n${message}`,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return res
      .status(500)
      .json({ error: "Failed to send email. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Email server listening on http://localhost:${port}`);

  if (gmailUser && gmailPass) {
    console.log("OK");
  }
});

