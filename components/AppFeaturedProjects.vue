<script lang="ts" setup>
import type { iFeaturedProject } from '~/types/story'

interface IProps {
  title?: string
  text?: string
  projects?: iFeaturedProject[]
}

const props = defineProps<IProps>()

const isMobile = useMediaQuery('(max-width: 860px)')
const showAll = ref(false)

const allProjects = computed(() => props.projects ?? [])

const visibleProjects = computed(() => {
  if (isMobile.value) return allProjects.value
  return showAll.value ? allProjects.value : allProjects.value.slice(0, 8)
})

const route = useRoute()

const onClick = () => {
  route.meta.isProjectTransition = true
}
</script>

<template>
  <div class="app-projects">
    <div class="app-projects__wrapper container">
      <h2 v-if="title" class="app-projects__title">
        {{ title }}
      </h2>
      <p v-if="text" class="app-projects__text">
        {{ text }}
      </p>
      <div class="app-projects__list-wrapper">
        <ul class="app-projects__list">
          <li
            v-for="(project, idx) in visibleProjects"
            :key="idx"
            class="app-projects__card"
          >
            <NuxtLink
              data-t-card
              :to="`/${project?.full_slug}`"
              class="app-projects__link"
              @click="onClick"
            >
              <CustomImage
                :src="project?.content?.cover?.filename"
                :alt="project?.content?.cover?.alt"
                class="app-projects__img"
                data-t-img
                :data-slug="project?.slug"
              />
              <div class="app-projects__info">
                <h3 class="app-projects__name">
                  {{ project?.content?.name }}
                </h3>
                <div class="app-projects__specs">
                  <p class="app-projects__spec">
                    {{ project?.content?.spec_1 }}
                  </p>
                  <p class="app-projects__spec">
                    {{ project?.content?.spec_2 }}
                  </p>
                  <p class="app-projects__spec">
                    {{ project?.content?.spec_3 }}
                  </p>
                </div>
                <div class="app-projects__plus">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 13V23H13V13H23V11H13V1H11V11H1V13H11Z"
                      fill="url(#paint0_linear_1_2446)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1_2446"
                        x1="12"
                        y1="1"
                        x2="12"
                        y2="23"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFCE7E" />
                        <stop offset="1" stop-color="#997C4B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ul>

        <Button
          v-if="allProjects.length > 8"
          class="app-projects__btn"
          type="button"
          @click="showAll = !showAll"
        >
          <span>{{ showAll ? 'LESS' : 'MORE' }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/styles/ui/card-hover' as *;

.app-projects {
  background: var(--neutral-600);
  color: var(--basic-white);
  padding-top: vw(40);
  padding-bottom: vw(112);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
}

.app-projects__wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  row-gap: vw(100);

  @media (max-width: $br1) {
    row-gap: 40px;
  }
}

.app-projects__title {
  text-transform: uppercase;
  line-height: 1.25em;
  font-size: vw(68);
  max-width: vw(350);
  @include med;

  @media (max-width: $br1) {
    max-width: 100%;
    font-size: size(68, 44);
  }

  @media (max-width: $br4) {
    font-size: 44px;
  }
}

.app-projects__text {
  @include text-t3;
}

.app-projects__list-wrapper {
  @media (min-width: $br1) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media (max-width: $br1) {
    width: 100vw;
    overflow-x: auto;
    padding-right: 32px;
    padding-left: 32px;
  }

  @media (max-width: $br3) {
    padding-left: 16px;
    margin-left: -16px;
  }
}

.app-projects__list {
  @media (min-width: $br1) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);

    gap: vw(20);
    grid-auto-flow: row;
  }

  @media (max-width: $br1) {
    display: flex;
    align-items: center;
    min-width: max-content;
    column-gap: 16px;
  }
}

.app-projects__card {
  &:last-child {
    @media (max-width: $br1) {
      margin-right: 32px;
    }
    @media (max-width: $br3) {
      margin-right: 16px;
    }
  }
}

.app-projects__link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--neutral-400);
  padding: vw(16);
  row-gap: vw(24);
  @include card-hover('.app-projects__img');

  @media (max-width: $br1) {
    padding: 16px;
    row-gap: 40px;
  }
}

.app-projects__img {
  aspect-ratio: 292 / 292;
  object-fit: cover;

  @media (max-width: $br1) {
    aspect-ratio: 268 / 268;
    height: 268px;
  }
}

.app-projects__name {
  font-size: vw(24);
  line-height: 1em;
  text-transform: uppercase;
  @include med;

  @media (max-width: $br1) {
    font-size: 24px;
    line-height: 1.17em;
  }
}
.app-projects__specs {
  margin-top: vw(16);
  color: var(--neutral-200);
  @include text-t4;

  @media (max-width: $br1) {
    margin-top: 8px;
  }
}

.app-projects__plus {
  display: block;
  width: vw(22);
  height: vw(22);
  margin-top: vw(17);

  @media (max-width: $br1) {
    margin-top: 12px;
    width: 20px;
    height: 20px;
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.app-projects__btn {
  margin-top: vw(100);

  @media (max-width: $br1) {
    display: none;
  }
}
</style>
