import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getContactClickEvent,
  WEBSITE_EVENTS,
} from '../utils/analyticsEvents.ts'

test('the website publishes exactly the six approved browser events', () => {
  assert.deepEqual(WEBSITE_EVENTS, [
    'page_view',
    'form_start',
    'generate_lead',
    'click_whatsapp',
    'click_phone',
    'click_email',
  ])
})

test('contact links map to the correct event', () => {
  assert.equal(getContactClickEvent('tel:+66123456789'), 'click_phone')
  assert.equal(getContactClickEvent('mailto:sales@sidthailand.com'), 'click_email')
  assert.equal(getContactClickEvent('https://wa.me/66123456789'), 'click_whatsapp')
  assert.equal(getContactClickEvent('https://example.com'), undefined)
})
