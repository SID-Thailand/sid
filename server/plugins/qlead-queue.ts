import {
  processQualifiedLeadDelivery,
  QLEAD_QUEUE_TOPICS,
  type QLeadChannel,
} from '~/server/api/kommo-qualified-lead.post'

type QueueMessage = {
  leadId?: number
  channel?: QLeadChannel
}

const isQleadChannel = (value: unknown): value is QLeadChannel =>
  typeof value === 'string' && value in QLEAD_QUEUE_TOPICS

export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('vercel:queue', async ({ message, metadata }) => {
    const payload = message as QueueMessage
    const channel = payload.channel

    if (
      !isQleadChannel(channel) ||
      !Number.isInteger(payload.leadId) ||
      metadata.topicName !== QLEAD_QUEUE_TOPICS[channel]
    ) {
      return
    }

    const status = await processQualifiedLeadDelivery(
      payload.leadId as number,
      channel,
      metadata.messageId
    )

    console.info('Qualified lead queue delivery result', {
      leadId: payload.leadId,
      channel,
      status,
      messageId: metadata.messageId,
    })
  })
})
