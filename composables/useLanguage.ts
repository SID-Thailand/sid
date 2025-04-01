export const useLang = () => {
  const selectedLang = useState('selectedLang', () => 'en')

  return { selectedLang }
}
