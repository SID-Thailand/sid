import { useGetStory } from './getStory'
import type { iFormContent, iStory } from '~/types/story'

type tFormStory = () => Promise<{
  story: Ref<iStory<iFormContent>>
}>

export const useFormStory: tFormStory = async () => {
  const story = useState<iStory<iFormContent>>('components/form', () => null)

  try {
    if (!story.value) {
      const res = await useGetStory('components/form')

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
