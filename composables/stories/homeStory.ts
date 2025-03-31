import { useGetStory } from './getStory'
import type { iHomeContent, iStory } from '~/types/story'

type tHomeStory = () => Promise<{
  story: Ref<iStory<iHomeContent>>
}>

export const useHomeStory: tHomeStory = async () => {
  const story = useState<iStory<iHomeContent>>('index', () => null)

  try {
    if (!story.value) {
      const res = await useGetStory('index')

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
