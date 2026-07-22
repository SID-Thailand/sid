type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

type HoneypotDocument = {
  querySelectorAll: (selector: string) => Iterable<{ value?: unknown }>
}

export const readHoneypotValue = (documentRef: HoneypotDocument) => {
  for (const input of documentRef.querySelectorAll('input[name="website"]')) {
    const value = String(input.value || '').trim()
    if (value) return value
  }

  return ''
}

export const getOrCreateSubmissionId = (
  storage: StorageLike,
  storageKey: string,
  createId: () => string
) => {
  const existing = storage.getItem(storageKey)
  if (existing) return existing

  const requestId = createId()
  storage.setItem(storageKey, requestId)
  return requestId
}

export const clearSubmissionId = (storage: StorageLike, storageKey: string) => {
  storage.removeItem(storageKey)
}
