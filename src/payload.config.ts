import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { cloudinaryAdapter } from '@payloadcms/plugin-cloud-storage/cloudinary'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Manufacturers } from './collections/Manufacturers'
import { Cars } from './collections/cars'
import { Pages } from './collections/Pages'
import { Enquiries } from './collections/Enquiries'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Cars, Manufacturers, Pages, Enquiries],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter({
            config: {
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
              api_key: process.env.CLOUDINARY_API_KEY || '',
              api_secret: process.env.CLOUDINARY_API_SECRET || '',
            },
            folder: 'prestige-motors',
          }),
        },
      },
    }),
  ],
})