export const normalizeGoogleEmail = (raw: string) => {
  const normalized = raw.trim().toLowerCase().replace(/\s+/g, '')
  const atIndex = normalized.lastIndexOf('@')
  if (atIndex <= 0 || atIndex === normalized.length - 1) return ''

  let localPart = normalized.slice(0, atIndex)
  const domain = normalized.slice(atIndex + 1)
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    localPart = localPart.split('+')[0].replaceAll('.', '')
  }

  return localPart ? `${localPart}@${domain}` : ''
}

export const normalizeGooglePhone = (raw: string) => {
  const trimmed = raw.trim()
  if (!trimmed.startsWith('+')) return ''

  const normalized = `+${trimmed.slice(1).replace(/\D/g, '')}`
  return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : ''
}

export const normalizeMetaPhone = (raw: string) => {
  const normalized = raw.replace(/\D/g, '')
  return /^[1-9]\d{7,14}$/.test(normalized) ? normalized : ''
}
