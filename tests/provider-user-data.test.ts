import assert from 'node:assert/strict'
import test from 'node:test'
import {
  normalizeGoogleEmail,
  normalizeGooglePhone,
  normalizeMetaPhone,
} from '../server/utils/providerUserData.ts'

test('Google email normalization follows provider matching rules', () => {
  assert.equal(
    normalizeGoogleEmail(' Cloudy.SanFrancisco+shopping@gmail.com '),
    'cloudysanfrancisco@gmail.com'
  )
  assert.equal(
    normalizeGoogleEmail('User.Name+NYC@Example.com'),
    'user.name+nyc@example.com'
  )
})

test('Google phone normalization accepts only E.164 input', () => {
  assert.equal(normalizeGooglePhone('+66 (81) 234-5678'), '+66812345678')
  assert.equal(normalizeGooglePhone('0812345678'), '')
})

test('Meta phone normalization keeps country-code digits', () => {
  assert.equal(normalizeMetaPhone('+66 (81) 234-5678'), '66812345678')
  assert.equal(normalizeMetaPhone('123'), '')
})
