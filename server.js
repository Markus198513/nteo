const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const allowed = /\.(pdf|svg|eps|ai|png|jpe?g|webp|zip)$/i.test(file.originalname);
    cb(allowed ? null : new Error("Unsupported file type"), allowed);
  }
});
app.use(express.static(__dirname));
app.get("/health", (req, res) => res.json({ ok: true }));
app.post("/api/quote", upload.single("artwork"), async (req, res) => {
  try {
    const { name, phone, email, city, service, size, installation, message, language } = req.body;
    if (!name || !phone || !city) return res.status(400).json({ error: "Please complete required fields." });
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.TO_EMAIL) {
      return res.status(503).json({ error: "Email is not configured yet." });
    }
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    const fields = { name, phone, email, city, service, size, installation, message, language };
    const text = Object.entries(fields).map(([k,v]) => `${k}: ${v || "-"}`).join("\n");
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      replyTo: email || process.env.REPLY_TO_EMAIL || undefined,
      subject: `NTEO website enquiry — ${name} / ${city}`,
      text,
      attachments: req.file ? [{ filename: req.file.originalname, content: req.file.buffer }] : []
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not send enquiry." });
  }
});
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === "Unsupported file type") return res.status(400).json({ error: err.message });
  next(err);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`NTEO vinyl landing listening on ${port}`));
