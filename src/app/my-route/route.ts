import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const headers = await getHeaders()

  const { user } = await payload.auth({ headers })

  if (user) {
    const cars = await payload.find({
      collection: 'cars',
      select: {
        title: true,
      },
    })

    return Response.json({
      message: 'Success',
      cars,
      user,
    })
  }

  return Response.json(
    { message: 'Unauthorized' },
    { status: 403 }
  )
}