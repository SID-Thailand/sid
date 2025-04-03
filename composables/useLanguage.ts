export const useLang = () => {
  const { $getLocale, $getLocales, $switchLocale } = useI18n()
  const selectedLang = useState<string>('lang', () => $getLocale())

  watchEffect(() => {
    selectedLang.value = $getLocale()
  })

  const setLang = async (lang: string) => {
    if (lang !== selectedLang.value) {
      await $switchLocale(lang)
      selectedLang.value = lang
    }
  }

  const languages = computed(() => $getLocales().map(locale => locale.code))

  return { selectedLang, languages, setLang }
}
