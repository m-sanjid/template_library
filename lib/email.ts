import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendContactEmail(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) {
    const {name,email,subject,message} = data;

    try {
        return transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `New contact form submission: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
            <h3>Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <h4>Message</h4>
            <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}