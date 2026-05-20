import nodemailer from 'nodemailer'
import twilio from 'twilio'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
})

export async function sendEnquiryEmail(data: {
  name: string
  phone: string
  email: string
  message: string
  car: string
}) {
  await transporter.sendMail({
    from: `"Prestige Motors" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `🚗 New Enquiry from ${data.name}`,
    html: `
      <h2>New Car Enquiry - Prestige Motors</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Car Interested In:</strong> ${data.car}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `,
  })
}

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export async function sendWhatsAppMessage(data: {
  name: string
  phone: string
  email: string
  message: string
  car: string
}) {
  await twilioClient.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${process.env.WHATSAPP_TO}`,
    body: `🚗 New Enquiry - Prestige Motors!\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nCar: ${data.car}\nMessage: ${data.message}`,
  })
}
