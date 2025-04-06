import type { iStory } from '~/types/story'

type tResStory = {
  data: {
    story: iStory
  }
}

export const useGetStory = async (route: string) => {
  const response = ref<iStory>(null)
  const retryCounter = ref(0)
  const config = useRuntimeConfig()
  const storyapi = useStoryblokApi()

  const { selectedLang } = useLang()
  const { isInEditor } = useAppState()
  const { addToast } = useToasts()

  const getStory = async () => {
    if (!response.value) {
      try {
        const { data }: tResStory = await storyapi.get(`cdn/stories/${route}`, {
          version:
            config.public.ENVIROMENT === 'development' || isInEditor.value
              ? 'draft'
              : 'published',
          cv: Date.now(),
          language: selectedLang.value,
          resolve_relations: [
            'cta_block.manager',
            'home.cta',
            'featured_projects.featured_projects',
            'quiz_block.quiz',
            'footer.contacts',
            'company_direction.person',
          ],
        })

        response.value = data.story
      } catch (e) {
        console.log(e.message)

        if (retryCounter.value > 2) {
          addToast({
            color: ToastColor.danger,
            id: Date.now().toString(),
            text: 'An error with our server was occurred. Try to reload page',
          })
          return
        }

        await getStory()
        retryCounter.value = retryCounter.value + 1
      }
    }
  }
  await getStory()

  return response
}
