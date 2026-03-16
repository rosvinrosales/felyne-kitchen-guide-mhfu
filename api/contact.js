/* eslint-env node */
import nodemailer from "nodemailer";

const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_PASS;

const transporter =
  gmailUser && gmailPass
    ? nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      })
    : null;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  if (!transporter) {
    res.status(503).json({
      error: "Email is not configured. Set GMAIL_USER and GMAIL_PASS.",
    });
    return;
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    res.status(400).json({ error: "Invalid JSON body." });
    return;
  }

  const { email, message } = body ?? {};

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Message is required." });
    return;
  }

  try {
    await transporter.sendMail({
      from: gmailUser,
      to: gmailUser,
      subject: "New message from Felyne Kitchen Guide contact form",
      text: `From: ${email || "no email provided"}\n\n${message}`,
    });
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    res
      .status(500)
      .json({ error: "Failed to send email. Please try again later." });
  }
}
