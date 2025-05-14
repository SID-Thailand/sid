import { useGetStory } from './getStory'
import type { iLegalContent, iStory } from '~/types/story'

type tPolicyStory = () => Promise<{
  story: Ref<iStory<iLegalContent>>
}>

export const usePolicyStory: tPolicyStory = async () => {
  const story = useState<iStory<iLegalContent>>('policy', () => null)

  try {
    if (!story.value) {
      const res = await useGetStory('legal/privacy-policy')
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
