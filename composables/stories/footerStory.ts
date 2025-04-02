import { useGetStory } from './getStory'
import type { iFooterContent, iStory } from '~/types/story'

type tFooterStory = () => Promise<{
  story: Ref<iStory<iFooterContent>>
}>

export const useFooterStory: tFooterStory = async () => {
  const story = useState<iStory<iFooterContent>>(
    'components/footer',
    () => null
  )

  try {
    if (!story.value) {
      const res = await useGetStory('components/footer')

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
