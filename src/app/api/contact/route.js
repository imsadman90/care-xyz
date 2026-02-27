import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";

function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
function sanitizeHeader(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[\r\n\t]/g, " ").trim();
}

const ALLOWED_SUBJECTS = [
  "General Inquiry",
  "Caregiver Application",
  "Support",
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // ── 1. Presence check ──
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // ── 2. Type check ──
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid input types" },
        { status: 400 },
      );
    }

    // ── 3. Length limits ──
    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name too long (max 100)" },
        { status: 400 },
      );
    }
    if (email.length > 254) {
      return NextResponse.json({ error: "Email too long" }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message too long (max 2000)" },
        { status: 400 },
      );
    }

    // ── 4. Email format check ──
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    const safeSubject =
      subject && ALLOWED_SUBJECTS.includes(subject)
        ? subject
        : "General Inquiry";

    const subjectLine = sanitizeHeader(`[Contact] ${safeSubject} — ${name}`);

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");

    const html = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
      <hr />
      <p>${safeMessage}</p>
    `;

    await sendEmail({ to: process.env.EMAIL_USER, subject: subjectLine, html });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
