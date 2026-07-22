import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildQleadSentState,
  getQleadDedupeKey,
  parseQleadSentState,
} from '../server/utils/qleadDedupe.ts'

test('qualified lead lock key is unique per lead and provider', () => {
  assert.equal(getQleadDedupeKey(15596117, 'meta'), 'qlead:15596117:meta')
  assert.notEqual(
    getQleadDedupeKey(15596117, 'meta'),
    getQleadDedupeKey(15596117, 'google')
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
