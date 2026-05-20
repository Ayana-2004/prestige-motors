import type { CollectionConfig } from 'payload'
import { sendEnquiryEmail, sendWhatsAppMessage } from '../lib/notifications'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'car',
      type: 'relationship',
      relationTo: 'cars',
      required: true,
    },
  ],

  // 🔥 This runs every time a new enquiry is submitted
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          try {
            await sendEnquiryEmail({
              name: doc.name,
              phone: doc.phone,
              email: doc.email,
              message: doc.message || 'No message provided',
              car: doc.car,
            })
            await sendWhatsAppMessage({
              name: doc.name,
              phone: doc.phone,
              email: doc.email,
              message: doc.message || 'No message provided',
              car: doc.car,
            })
            console.log('✅ Email and WhatsApp sent!')
          } catch (err) {
            console.error('❌ Notification error:', err)
          }
        }
      },
    ],
  },
}