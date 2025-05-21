import type { iStory } from '~/types/story'

type tResStory = {
  data: {
    story: iStory
  }
}

export const useGetStory = async (route: string) => {
  const response = ref<iStory>(null)

  const config = useRuntimeConfig()
  const storyapi = useStoryblokApi()

  const { selectedLang } = useLang()
  const { isInEditor } = useAppState()
  const { addToast } = useToasts()

  const maxRetries = 3

  const getStory = async (attempt = 0) => {
    if (!response.value) {
      try {
        const { data }: tResStory = await storyapi.get(`cdn/stories/${route}`, {
          version:
            config.public.env === 'development' || isInEditor.value
              ? 'draft'
              : 'published',
          cv: Date.now(),
          language: selectedLang.value,
          resolve_relations: [
            'cta_block.manager',
            'home.cta',
            'featured_projects.featured_projects',
            'consultancy_featured_projects.featured_projects',
            'quiz_block.quiz',
            'footer.contacts',
            'company_direction.person',
            'project.category',
            'project.cta',
            'about.cta',
            'about_team_group.members',
            'consulting.cta',
            'consulting_expertise.interview',
            'consulting_experts.experts',
            'about_hero.interview',
            'project_home.cta',
            'news_home.cta',
            'contact.cta',
            'contact.contacts',
            'page.cta',
            'page.category',
            'page_policy.cta',
          ],
        })

        response.value = data.story
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

        await getStory(attempt + 1)
      }
    }
  }
  await getStory()

  return response
}
