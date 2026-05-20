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
            })
            await sendWhatsAppMessage({
              name: doc.name,
              phone: doc.phone,
              email: doc.email,
              message: doc.message || 'No message provided',
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
