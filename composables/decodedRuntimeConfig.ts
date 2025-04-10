import { decodeConfig } from '~/cli/decodeEnv'

export const useDecocedRuntimeConfig = () => {
  const config = useRuntimeConfig()

  return {
    public: decodeConfig(config.public.value),
    app: config.app,
  }
}
