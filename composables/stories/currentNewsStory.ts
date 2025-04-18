import { useGetStory } from './getStory'
import type { iStory } from '~/types/story'
import type { iCurrentNewsContent } from '~/types/currentNewsTypes'

type tNewsStory = (id: string) => Promise<{
  story: Ref<iStory<iCurrentNewsContent>>
}>

export const useCurrentNewsStory: tNewsStory = async id => {
  const story = useState<iStory<iCurrentNewsContent>>(`news/${id}`, () => null)

  try {
    if (!story.value) {
      const res = await useGetStory(`news/${id}`)

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
