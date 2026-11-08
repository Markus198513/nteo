const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024, files: 1, fields: 12 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const allowed = [".pdf",".svg",".eps",".ai",".png",".jpg",".jpeg",".webp",".zip"];
    if (!allowed.includes(ext)) return cb(new Error("unsupported_file"));
    cb(null, true);
  }
});

const hits = new Map();
function rateLimit(req, res, next) {
  const key = req.ip || "unknown";
  const now = Date.now();
  const prev = hits.get(key) || [];
  const recent = prev.filter(t => now - t < 10 * 60 * 1000);
  if (recent.length >= 8) return res.status(429).json({ error: "rate_limited" });
  recent.push(now); hits.set(key, recent); next();
}

app.get("/health", (req, res) => res.json({ status: "ok", service: "nteo-vinyl-stickers" }));
app.post("/api/quote", rateLimit, upload.single("artwork"), async (req, res) => {
  try {
    if (req.body.company_website) return res.json({ ok: true });
    const { name, contact, service, city, size, details } = req.body || {};
    if (!name || !contact || !city) return res.status(400).json({ error: "missing_fields" });

    const required = ["SMTP_HOST","SMTP_USER","SMTP_PASS","TO_EMAIL"];
    if (required.some(k => !process.env[k])) {
      return res.status(503).json({ error: "email_not_configured" });
    }
    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const isRu = (req.headers["accept-language"] || "").toLowerCase().includes("ru");
    const subject = `NTEO website enquiry — ${city} — ${name}`;
    const lines = [
      "New NTEO Vinyl Stickers enquiry",
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Service: ${service || "-"}`,
      `City / area: ${city}`,
      `Approximate size: ${size || "-"}`,
      `Details: ${details || "-"}`,
      `Language: ${isRu ? "Russian" : "English"}`,
      `IP: ${req.ip || "-"}`
    ];
    const attachments = req.file ? [{
      filename: path.basename(req.file.originalname).replace(/[^\w.\- ()]/g, "_"),
      content: req.file.buffer,
      contentType: req.file.mimetype || "application/octet-stream"
    }] : [];

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      replyTo: process.env.REPLY_TO_EMAIL || undefined,
      subject,
      text: lines.join("\n"),
      attachments
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("Quote submission failed:", err.message);
    if (err.message === "unsupported_file") return res.status(400).json({ error: "unsupported_file" });
    if (err.code === "LIMIT_FILE_SIZE") return res.status(413).json({ error: "file_too_large" });
    res.status(500).json({ error: "send_failed" });
  }
});

app.use((err, req, res, next) => {
  console.error("Request error:", err.message);
  if (err.message === "unsupported_file") return res.status(400).json({ error: "unsupported_file" });
  if (err.code === "LIMIT_FILE_SIZE") return res.status(413).json({ error: "file_too_large" });
  res.status(400).json({ error: "invalid_request" });
});

app.use(express.static(ROOT, { extensions: ["html"] }));
app.get("*", (req, res) => res.sendFile(path.join(ROOT, "index.html")));
app.listen(PORT, () => console.log(`NTEO Vinyl Stickers listening on ${PORT}`));
