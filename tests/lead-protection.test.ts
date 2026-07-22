import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getCompletedLeadId,
  isAllowedLeadOrigin,
  isValidRequestId,
} from '../server/utils/leadProtection.ts'

test('lead endpoint accepts only a matching same-site origin', () => {
  assert.equal(
    isAllowedLeadOrigin('https://sidthailand.com', 'sidthailand.com'),
    true
  )
  assert.equal(
    isAllowedLeadOrigin('https://attacker.example', 'sidthailand.com'),
    false
  )
  assert.equal(isAllowedLeadOrigin(undefined, 'sidthailand.com'), false)
})

test('idempotency key must be a UUID v4', () => {
  assert.equal(isValidRequestId('8cf1a9a2-1f11-4d31-90e9-7a24775d42bd'), true)
  assert.equal(isValidRequestId('not-a-request-id'), false)
})

test('completed form state returns its original Kommo lead ID', () => {
  assert.equal(getCompletedLeadId('completed:15596117'), 15596117)
  assert.equal(getCompletedLeadId('processing:token'), undefined)
  assert.equal(getCompletedLeadId('completed:not-a-number'), undefined)
})
