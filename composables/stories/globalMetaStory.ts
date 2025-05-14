import { useGetStory } from './getStory'
import type { iGlobalMetaContent, iStory } from '~/types/story'

type tFormStory = () => Promise<{
  story: Ref<iStory<iGlobalMetaContent>>
}>

export const useGlobalMetaStory: tFormStory = async () => {
  const story = useState<iStory<iGlobalMetaContent>>(
    'components/global-meta',
    () => null
  )

  try {
    if (!story.value) {
      const res = await useGetStory('components/meta')
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
