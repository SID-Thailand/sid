export const QLEAD_LOCK_TTL_SECONDS = 300
export const QLEAD_SENT_TTL_SECONDS = 31_536_000
export const QLEAD_JOURNAL_TTL_SECONDS = 31_536_000

export const getQleadDedupeKey = (leadId: number, channel: string) =>
  `qlead:${leadId}:${channel}`

export const getQleadJournalKey = (leadId: number, channel: string) =>
  `qlead-journal:${leadId}:${channel}`

export const buildQleadJournalState = (
  status: string,
  detail: string,
  updatedAt: string
) => JSON.stringify({ status, detail, updatedAt })

export const buildQleadSentState = (sentAt: string, detail: string) =>
  JSON.stringify({ status: 'sent', sentAt, detail })

export const parseQleadSentState = (state: string | undefined) => {
  if (!state) return undefined

  try {
    const parsed = JSON.parse(state) as {
      status?: string
      sentAt?: string
      detail?: string
    }
    if (parsed.status !== 'sent' || !parsed.sentAt) return undefined
    return { sentAt: parsed.sentAt, detail: parsed.detail || 'atomic journal' }
  } catch {
    return undefined
  }
}
