import type { iCurrentProjectContent } from '~/types/currentProjectTypes'
import { useGetStory } from './getStory'
import type { iStory } from '~/types/story'

type tProjectStory = (id: string) => Promise<{
  story: Ref<iStory<iCurrentProjectContent>>
}>

export const useCurrentConsProjectStory: tProjectStory = async id => {
  const story = useState<iStory<iCurrentProjectContent>>(
    `cons-projects/${id}`,
    () => null
  )

  try {
    if (!story.value) {
      const res = await useGetStory(`consultancy-projects/${id}`)

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
