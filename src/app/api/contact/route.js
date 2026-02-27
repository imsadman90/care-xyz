import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const subjectLine = subject
      ? `[Contact] ${subject}`
      : `[Contact] New message from ${name}`;

    const html = `
      <h2>New contact message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject || "General"}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    // send to site support address (EMAIL_USER)
    await sendEmail({ to: process.env.EMAIL_USER, subject: subjectLine, html });

    // optional: send a quick confirmation to the user (uncomment if wanted)
    // await sendEmail({ to: email, subject: "We've received your message", html: '<p>Thanks — we will get back to you shortly.</p>' })

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
