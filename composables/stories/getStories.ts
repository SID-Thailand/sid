import type { ISbStoriesParams } from '@storyblok/js'
import { useDecocedRuntimeConfig } from '../decodedRuntimeConfig'
import type { iStory } from '~/types/story'

type tResStory = {
  data: {
    stories: iStory[]
  }
}

export const useGetStories = async (opts: ISbStoriesParams) => {
  const response = ref<iStory[]>(null)
  const retryCounter = ref(0)
  const config = useDecocedRuntimeConfig()

  const storyapi = useStoryblokApi()
  const { isInEditor } = useAppState()

  const getStories = async () => {
    if (!response.value) {
      try {
        const { data }: tResStory = await storyapi.get('cdn/stories/', {
          sort_by: 'name:asc',
          version:
            config.public.ENVIROMENT === 'development' || isInEditor.value
              ? 'draft'
              : 'published',
          cv: Date.now(),
          ...opts,
        })

        response.value = data.stories
      } catch (e) {
        console.log(e.message)

        if (retryCounter.value > 2) {
          throw new Error("Can't get story")
        }

        await getStories()
        retryCounter.value = retryCounter.value + 1
      }
    }
  }
  await getStories()

  return response
}
