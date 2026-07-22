import assert from 'node:assert/strict'
import test from 'node:test'
import {
  clearSubmissionId,
  getOrCreateSubmissionId,
  readHoneypotValue,
} from '../utils/formProtection.ts'

test('honeypot reports the first non-empty hidden field', () => {
  const documentRef = {
    querySelectorAll: () => [{ value: '' }, { value: ' bot.example ' }],
  }

  assert.equal(readHoneypotValue(documentRef), 'bot.example')
})

test('a failed form retry reuses its original idempotency key', () => {
  const values = new Map<string, string>()
  const storage = {
    getItem: (key: string) => values.get(key) || null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  }
  let generated = 0
  const createId = () => `request-${++generated}`

  assert.equal(getOrCreateSubmissionId(storage, 'lead', createId), 'request-1')
  assert.equal(getOrCreateSubmissionId(storage, 'lead', createId), 'request-1')

  clearSubmissionId(storage, 'lead')
  assert.equal(getOrCreateSubmissionId(storage, 'lead', createId), 'request-2')
})
