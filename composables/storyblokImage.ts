interface iOpts {
  format?: 'webp' | 'jpg' | 'png' | null
  quality?: number
  size?: string
}

const getUrl = (url: string) =>
  url.replace('//a.storyblok.com', '//a2.storyblok.com')

const createFilters = (options: iOpts) => {
  const filters = []

  if (options.quality) {
    filters.push(`quality(${options.quality})`)
  }

  if (options.format) {
    filters.push(`format(${options.format})`)
  }

  return filters?.length ? `filters:${filters.join(':')}` : ''
}

export const useStoryblokImage = (image: string, options: iOpts = {}) => {
  if (!image) return ''

  const url = getUrl(image)

  const filters = createFilters(options)
  const size = options.size ?? null

  const imageService = 'https://a2.storyblok.com'
  const path = url.replace(imageService, '')

  let customPath = ''

  if (size) {
    customPath = '/m/' + size + '/' + filters
  }

  if (!size && filters) {
    customPath = '/m/' + filters
  }

  return imageService + path + customPath
}
