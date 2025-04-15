import type { iMenuContent } from '~/types/menuTypes'
import { useGetStory } from './getStory'
import type { iStory } from '~/types/story'

type tMenuStory = () => Promise<{
  story: Ref<iStory<iMenuContent>>
}>

export const useMenuStory: tMenuStory = async () => {
  const story = useState<iStory<iMenuContent>>('components/menu', () => null)

  try {
    if (!story.value) {
      const res = await useGetStory('components/menu')

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
