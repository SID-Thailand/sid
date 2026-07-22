import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildQleadJournalState,
  buildQleadSentState,
  getQleadDedupeKey,
  getQleadJournalKey,
  parseQleadSentState,
} from '../server/utils/qleadDedupe.ts'

test('qualified lead lock key is unique per lead and provider', () => {
  assert.equal(getQleadDedupeKey(15596117, 'meta'), 'qlead:15596117:meta')
  assert.notEqual(
    getQleadDedupeKey(15596117, 'meta'),
    getQleadDedupeKey(15596117, 'google')
  )
})

test('qualified lead journal is separate from the atomic delivery key', () => {
  assert.equal(
    getQleadJournalKey(15596117, 'meta'),
    'qlead-journal:15596117:meta'
  )
  assert.notEqual(
    getQleadJournalKey(15596117, 'meta'),
    getQleadDedupeKey(15596117, 'meta')
  )
  assert.deepEqual(
    JSON.parse(
      buildQleadJournalState(
        'sent',
        'provider accepted',
        '2026-07-22T06:00:00.000Z'
      )
    ),
    {
      status: 'sent',
      detail: 'provider accepted',
      updatedAt: '2026-07-22T06:00:00.000Z',
    }
  )
})

test('sent state survives serialization for retry reconciliation', () => {
  const state = buildQleadSentState(
    '2026-07-22T06:00:00.000Z',
    'provider delivery accepted'
  )
  assert.deepEqual(parseQleadSentState(state), {
    sentAt: '2026-07-22T06:00:00.000Z',
    detail: 'provider delivery accepted',
  })
  assert.equal(parseQleadSentState('processing:token'), undefined)
})
