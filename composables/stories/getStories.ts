import type { ISbStoriesParams } from '@storyblok/js'
import type { iStory } from '~/types/story'

type tResStory = {
  data: {
    stories: iStory[]
  }
}

export const useGetStories = async (opts: ISbStoriesParams) => {
  const response = ref<iStory[]>(null)

  const config = useRuntimeConfig()

  const storyapi = useStoryblokApi()
  const { isInEditor } = useAppState()
  const { addToast } = useToasts()

  const maxRetries = 3

  const { selectedLang } = useLang()

  const getStories = async (attempt?: number) => {
    if (!response.value) {
      try {
        const { data }: tResStory = await storyapi.get('cdn/stories/', {
          sort_by: 'name:asc',
          language: selectedLang.value,
          version:
            config.public.ENVIROMENT === 'development' || isInEditor.value
              ? 'draft'
              : 'published',
          cv:
            config.public.ENVIROMENT === 'production' ? Date.now() : undefined,
          ...opts,
          resolve_relations: [
            'project.category',
            'project.cta',
            'page.cta',
            'page.category',
          ],
        })

        response.value = data.stories
      } catch (e) {
        console.error(`Story fetch failed (attempt ${attempt + 1}):`, e.message)

        if (attempt + 1 >= maxRetries) {
          addToast({
            color: ToastColor.danger,
            id: Date.now().toString(),
            text: 'An error with our server occurred. Please try reloading the page.',
          })
          return
        }

        await getStories(attempt + 1)
      }
    }
  }
  await getStories()

  return response
}
