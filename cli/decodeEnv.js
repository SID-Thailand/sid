import { Base64 } from 'js-base64'

// Encode the runtimeConfig properties using base64url
export function encodeConfig(config) {
  const jsonConfig = JSON.stringify(config)
  return Base64.encode(jsonConfig)
}

// Decode the encoded string to get back the runtimeConfig properties
export function decodeConfig(encodedConfig) {
  const jsonConfig = Base64.decode(encodedConfig)
  return JSON.parse(jsonConfig)
}
