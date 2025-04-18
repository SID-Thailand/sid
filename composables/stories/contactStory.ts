import type { iContactContent } from '~/types/contactTypes'
import { useGetStory } from './getStory'
import type { iStory } from '~/types/story'

type tContactStory = () => Promise<{
  story: Ref<iStory<iContactContent>>
}>

export const useContactStory: tContactStory = async () => {
  const story = useState<iStory<iContactContent>>('contact', () => null)

  try {
    if (!story.value) {
      const res = await useGetStory('contact')

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
