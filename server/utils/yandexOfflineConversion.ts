type YandexOfflineConversionInput = {
  goalId: string
  qualifiedAt: number
  now?: number
  clientId?: string
  yclid?: string
}

const csvValue = (value: string) => `"${value.replaceAll('"', '""')}"`

export const buildYandexOfflineConversionCsv = (
  input: YandexOfflineConversionInput
) => {
  const yclid = String(input.yclid || '').trim()
  const clientId = String(input.clientId || '').trim()
  const identifierName = yclid ? 'Yclid' : clientId ? 'ClientId' : ''
  const identifierValue = yclid || clientId

  if (!identifierName || !identifierValue) return undefined

  const now = Math.floor(input.now || Date.now() / 1000)
  const requestedTimestamp = Math.floor(input.qualifiedAt || now - 1)
  const conversionTimestamp = Math.max(1, Math.min(requestedTimestamp, now - 1))
  const headers = ['Target', 'DateTime', identifierName]
  const record = [input.goalId, String(conversionTimestamp), identifierValue]

  return {
    csv: `${headers.join(',')}\n${record.map(csvValue).join(',')}\n`,
    identifierType: identifierName,
  }
}
