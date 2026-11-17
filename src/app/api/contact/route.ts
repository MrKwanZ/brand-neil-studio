import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, projectTypeLabel } from "@/lib/contact";

const CONTACT_TO_EMAIL = process.env["CONTACT_TO_EMAIL"] ?? "neilhkcheng@gmail.com";
const CONTACT_FROM_EMAIL =
  process.env["CONTACT_FROM_EMAIL"] ?? "Neil Studio <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const apiKey = process.env["RESEND_API_KEY"];

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const { name, email, projectType, challenge } = parsed.data;
  const typeLabel = projectTypeLabel(projectType);
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `Project inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nProject type: ${typeLabel}\n\n${challenge}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Project type:</strong> ${escapeHtml(typeLabel)}</p>
      <p>${escapeHtml(challenge).replaceAll("\n", "<br />")}</p>
    `,
  });

  if (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
