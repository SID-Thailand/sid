import type { iProjectContent } from '~/types/projectTypes'
import { useGetStory } from './getStory'
import type { iStory } from '~/types/story'

type tProjectStory = (id: string) => Promise<{
  story: Ref<iStory<iProjectContent>>
}>

export const useProjectStory: tProjectStory = async id => {
  const story = useState<iStory<iProjectContent>>(`projects/${id}`, () => null)

  try {
    if (!story.value) {
      const res = await useGetStory(`projects/${id}`)

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
