import type { iProjectsContent } from '~/types/projectsTypes'
import { useGetStories } from '../getStories'
import type { iStory } from '~/types/story'

type tProjectsStories = (slug: string) => Promise<{
  projects: Ref<iStory<iProjectsContent>[]>
}>

export const useProjectsStories: tProjectsStories = async (slug: string) => {
  const projects = useState<iStory<iProjectsContent>[]>(slug, () => [])

  try {
    if (!projects.value?.length) {
      const res = await useGetStories({
        by_slugs: `${slug}/*`,
        content_type: 'project',
        sort_by: 'position:asc',
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
