import type { iNewsContent } from '~/types/newsTypes'
import { useGetStories } from './getStories'
import type { iStory } from '~/types/story'

type tNewsStories = () => Promise<{
  news: Ref<iStory<iNewsContent>[]>
}>

export const useNewsStories: tNewsStories = async () => {
  const news = useState<iStory<iNewsContent>[]>('news', () => [])

  try {
    if (!news.value?.length) {
      const res = await useGetStories({
        by_slugs: `news/*`,
        content_type: 'page',
      })

      news.value = res.value
    }
  } catch (error) {
    console.log(error)
  }

  if (import.meta.client) {
    const route = useRoute()
    const slug = route.params.project as string

    const currentStory = news.value.find(story => story.slug === slug)

    useStoryblokBridge(currentStory?.id, evStory => {
      news.value = news.value.filter(story => story.slug !== slug)
      news.value = [...news.value, evStory as unknown as iStory]
    })
  }

  return { news }
}
