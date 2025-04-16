import type { iConsultingContent } from '~/types/consultingTypes'
import { useGetStory } from './getStory'
import type { iStory } from '~/types/story'

type tConsultingStory = () => Promise<{
  story: Ref<iStory<iConsultingContent>>
}>

export const useConsultingStory: tConsultingStory = async () => {
  const story = useState<iStory<iConsultingContent>>('consulting', () => null)

  try {
    if (!story.value) {
      const res = await useGetStory('consulting')

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
