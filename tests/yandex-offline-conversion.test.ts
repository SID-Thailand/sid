import assert from 'node:assert/strict'
import test from 'node:test'
import { buildYandexOfflineConversionCsv } from '../server/utils/yandexOfflineConversion.ts'

test('Yandex offline conversion prefers yclid and sends one identifier type', () => {
  const result = buildYandexOfflineConversionCsv({
    goalId: '586798746',
    qualifiedAt: 100,
    now: 200,
    clientId: 'client-1',
    yclid: 'click-1',
  })

  assert.equal(result?.identifierType, 'Yclid')
  assert.equal(
    result?.csv,
    'Target,DateTime,Yclid\n"586798746","100","click-1"\n'
  )
  assert.equal(result?.csv.includes('ClientId'), false)
})

test('Yandex offline conversion falls back to ClientId', () => {
  const result = buildYandexOfflineConversionCsv({
    goalId: '586798746',
    qualifiedAt: 100,
    now: 200,
    clientId: 'client-1',
  })

  assert.equal(result?.identifierType, 'ClientId')
  assert.equal(
    result?.csv,
    'Target,DateTime,ClientId\n"586798746","100","client-1"\n'
  )
})

test('Yandex conversion timestamp is always in the past', () => {
  const result = buildYandexOfflineConversionCsv({
    goalId: '586798746',
    qualifiedAt: 250,
    now: 200,
    clientId: 'client-1',
  })

  assert.equal(
    result?.csv,
    'Target,DateTime,ClientId\n"586798746","199","client-1"\n'
  )
})

test('Yandex offline conversion requires an attribution identifier', () => {
  assert.equal(
    buildYandexOfflineConversionCsv({
      goalId: '586798746',
      qualifiedAt: 100,
      now: 200,
    }),
    undefined
  )
})
