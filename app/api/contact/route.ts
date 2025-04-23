import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as z from "zod";

// Schema for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Ensure environment variables are defined
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_APP_PASSWORD;
const bemailFrom = process.env.EMAIL_FROM || emailUser;
const emailTo = process.env.EMAIL_TO;

if (!emailUser || !emailPass || !emailTo) {
  console.error(
    "Missing required environment variables: EMAIL_USER, EMAIL_APP_PASSWORD, or EMAIL_TO."
  );
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export async function POST(request: Request) {
  console.log("API route hit");

  try {
    const body = await request.json();
    console.log("Received data:", body);

    const result = formSchema.safeParse(body);

    if (!result.success) {
      console.log("Validation failed:", result.error.flatten().fieldErrors);
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log(
      "EMAIL_APP_PASSWORD:",
      process.env.EMAIL_APP_PASSWORD ? "✔ Loaded" : "❌ Missing"
    );

    const { name, email, subject, message } = result.data;

    console.log("Preparing to send email with:", {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      using: process.env.EMAIL_USER,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || email,
      to: process.env.EMAIL_TO || "fallback@example.com",
      subject: `New Contact Form Submission: ${subject}`,
      text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
      html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
    });

    console.log("Email sent successfully");

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("❌ Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
