const formatDate = (dateString: string): string => {
  if (typeof dateString !== 'string') return ''

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export default formatDate
