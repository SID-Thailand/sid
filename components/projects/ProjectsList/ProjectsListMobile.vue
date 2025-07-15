<script lang="ts" setup>
import type { iProjectsContent } from '~/types/projectsTypes'
import type { iStory } from '~/types/story'

interface iProps {
  projects: iStory<iProjectsContent>[]
  projectBtn: string
}

const props = defineProps<iProps>()

const route = useRoute()

const onClick = () => {
  route.meta.isProjectTransition = true
}

const PER_PAGE = 10

const offset = ref(0)

const allProjects = computed(() => props.projects ?? [])

const slicedProjects = computed(() => {
  return allProjects.value.slice(0, PER_PAGE + offset.value)
})

const viewMoreHandler = () => {
  offset.value += PER_PAGE
}
</script>

<template>
  <section data-o class="projects-m">
    <div class="projects-m__container">
      <ul v-if="projects?.length" class="projects-m__list">
        <li
          v-for="item in allProjects"
          v-show="slicedProjects.includes(item)"
          :key="item?._uid"
          class="projects-m__item project-m"
        >
          <div class="project-m__bg">
            <CustomImage
              :src="item?.content?.cover?.filename"
              :alt="item?.content?.cover?.alt"
              class="project-m__bg"
            />
            <DarkLayer />
          </div>
          <div class="project-m__card" data-t-card :data-slug="item?.slug">
            <div class="project-m__img-wrapper" data-f-img-i>
              <CustomImage
                data-t-img
                :src="item?.content?.cover?.filename"
                :alt="item?.content?.cover?.alt"
                class="project-m__card-img"
                :data-slug="item?.slug"
              />
            </div>
            <div class="project-m__content">
              <h2 class="project-m__title">
                {{ item?.content?.name }}
              </h2>
              <p class="project-m__text">{{ item?.content?.description }}</p>

              <Button
                tag="nuxt-link"
                :href="`/${item?.full_slug}`"
                class="m-project__link"
                @click="onClick"
              >
                <span>
                  {{ projectBtn }}
                </span>
                <IconsArrowTopRight />
              </Button>
            </div>
          </div>
        </li>
      </ul>
      <ClientOnly>
        <Button
          v-if="
            allProjects?.length > PER_PAGE &&
            allProjects?.length > slicedProjects?.length
          "
          class="projects-m__more-btn"
          @click="viewMoreHandler"
          >More</Button
        >
      </ClientOnly>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/ui/card-hover' as *;

.projects-m__container {
  position: relative;
}

.project-m {
  height: 100vh;
  height: 100svh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
}
.project-m__bg {
  position: absolute;
  inset: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.project-m__card {
  position: relative;
  z-index: 2;
  flex: 0 1 auto;
  height: 65%;
  width: auto;
  aspect-ratio: 0.64;
  max-width: 100%;
  background-color: var(--neutral-600);
  position: relative;
  z-index: 3;
  padding: 16px;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;
  @include card-hover('.projects__assets');

  @media (max-width: $br4) {
    width: 100%;
    height: 80%;
    aspect-ratio: unset;
    flex: 1;
    max-height: 600px;
  }
}
.project-m__img-wrapper {
  flex: 0 1 auto;
  overflow: hidden;
  position: relative;
  height: 100%;
}
.project-m__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.project-m__content {
  margin-top: 24px;
  text-align: center;
}
.project-m__title {
  text-transform: uppercase;
  @include subheading-h1;
}
.project-m__text {
  margin-top: 16px;
  @include text-t3;
}
.m-project__link {
  display: block;
  width: fit-content;
  margin: 0 auto;
  margin-top: vw(32);
  padding-top: vw(16);
  padding-bottom: vw(16);
  font-size: vw(14);

  flex-shrink: 0;
  @media (max-width: $br1) {
    font-size: 14px;
    padding-top: 16px;
    padding-bottom: 16px;
    margin-top: 24px;
  }
}

.projects-m__more-btn {
  margin: 0 auto;
  display: block;
  margin-top: 60px;
}
</style>
