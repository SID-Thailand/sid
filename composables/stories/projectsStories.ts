import type { iProjectsContent } from '~/types/projectsTypes'
import { useGetStories } from './getStories'
import type { iStory } from '~/types/story'

type tProjectsStories = () => Promise<{
  projects: Ref<iStory<iProjectsContent>[]>
}>

export const useProjectsStories: tProjectsStories = async () => {
  const projects = useState<iStory<iProjectsContent>[]>('projects', () => [])

  try {
    if (!projects.value?.length) {
      const res = await useGetStories({
        by_slugs: `projects/*`,
        content_type: 'project',
      })

      projects.value = res.value
    }
  } catch (error) {
    console.log(error)
  }

  if (import.meta.client) {
    const route = useRoute()
    const slug = route.params.project as string

    const currentStory = projects.value.find(story => story.slug === slug)

    useStoryblokBridge(currentStory?.id, evStory => {
      projects.value = projects.value.filter(story => story.slug !== slug)
      projects.value = [...projects.value, evStory as unknown as iStory]
    })
  }

  return { projects }
}
