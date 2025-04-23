export function getImgSize(
  imgSrc: string
): Promise<{ height: number; width: number }> {
  return new Promise((resolve, reject) => {
    const newImg = new Image()

    newImg.onload = function () {
      const height = newImg.naturalHeight
      const width = newImg.naturalWidth

      resolve({ height, width })
    }

    newImg.onerror = function () {
      reject(new Error('Failed to load image'))
    }

    newImg.src = imgSrc
  })
}
