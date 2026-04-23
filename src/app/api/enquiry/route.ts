import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const payload = await getPayload({ config })

    const enquiry = await payload.create({
      collection: 'enquiries',
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        message: body.message,
        car: body.car,
      },
    })

    return NextResponse.json({
      success: true,
      enquiry,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong',
      },
      { status: 500 },
    )
  }
}
