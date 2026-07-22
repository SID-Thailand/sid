import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const leadEndpoint = readFileSync(
  new URL('../server/api/kommo-lead.post.ts', import.meta.url),
  'utf8'
)
const qualifiedLeadEndpoint = readFileSync(
  new URL('../server/api/kommo-qualified-lead.post.ts', import.meta.url),
  'utf8'
)

test('website integrations never create or modify the Kommo field schema', () => {
  for (const source of [leadEndpoint, qualifiedLeadEndpoint]) {
    assert.doesNotMatch(source, /\/api\/v4\/leads\/custom_fields[^?]/)
    assert.doesNotMatch(source, /ensureLeadField/)
  }
})

test('qualified lead delivery does not write journal fields into Kommo', () => {
  assert.doesNotMatch(qualifiedLeadEndpoint, /qlead_[a-z]+_(?:sent_at|status|detail)/)
  assert.doesNotMatch(qualifiedLeadEndpoint, /method:\s*['"]PATCH['"]/)
  assert.match(qualifiedLeadEndpoint, /getQleadJournalKey/)
})
