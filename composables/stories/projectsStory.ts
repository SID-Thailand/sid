import type { iProjectsHeroContent } from '~/types/projectsTypes'
import { useGetStory } from './getStory'
import type { iStory } from '~/types/story'

type tProjectsStory = () => Promise<{
  story: Ref<iStory<iProjectsHeroContent>>
}>

export const useProjectsStory: tProjectsStory = async () => {
  const story = useState<iStory<iProjectsHeroContent>>(
    'projectIndex',
    () => null
  )

  try {
    if (!story.value) {
      const res = await useGetStory('projects')

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
