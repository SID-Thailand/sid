import type { iNewsHeroContent } from '~/types/newsTypes'
import { useGetStory } from './getStory'
import type { iStory } from '~/types/story'

type tNewsStory = () => Promise<{
  story: Ref<iStory<iNewsHeroContent>>
}>

export const useNewsStory: tNewsStory = async () => {
  const story = useState<iStory<iNewsHeroContent>>('newsIndex', () => null)

  try {
    if (!story.value) {
      const res = await useGetStory('news')

      story.value = res.value
    }
  } catch (error) {
    console.log(error)
  }

  if (import.meta.client) {
    useStoryblokBridge(story.value?.id, evStory => {
      story.value = evStory as unknown as iStory
    })
  }

  return { story }
}
