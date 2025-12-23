import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { createUser } from '@/lib/server_functions/user'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)
    const { id } = evt.data
    const eventType = evt.type
    if (eventType === 'user.created') {
      const data = {
        $id: evt.data.id,
        email: evt.data.email_addresses[0].email_address,
        username: evt.data.first_name ?? "",
      }
      const result = await createUser(data)
      if (!result) return new Response('Error creating user', { status: 400 })
    }
    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}