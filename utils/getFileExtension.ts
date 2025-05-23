export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.')
  if (parts.length > 1) {
    return parts.pop() as string
  }
  return ''
}

export const isVideo = (filename: string): boolean => {
  if (!filename) {
    return false
  }
  const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv']
  const fileExtension = getFileExtension(filename).toLowerCase()
  return videoExtensions.includes(fileExtension)
}

export const isPicture = (filename: string): boolean => {
  if (!filename) {
    return false
  }
  const pictureExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
  const fileExtension = getFileExtension(filename).toLowerCase()
  return pictureExtensions.includes(fileExtension)
}
