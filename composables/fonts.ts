const fontsMetaList = []

export const useFonts = () => {
  useHead({
    link: [...fontsMetaList],
  })
}
