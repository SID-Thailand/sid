<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import type { iHomeFeaturedProjects } from '~/types/story'

interface IProps {
  content: iHomeFeaturedProjects
}

const { content } = defineProps<IProps>()

const activeProject = ref(0)

const projects = computed(() => {
  return content?.featured_projects || []
})
const projectCount = computed(() => {
  return content?.featured_projects.length || 0
})

const contentRef = ref<HTMLElement | null>(null)

const st = ref<ScrollTrigger | null>(null)
const dir = ref(1)

const makeAnimation = () => {
  const interval = 1 / projectCount.value

  st.value = ScrollTrigger.create({
    trigger: contentRef.value as HTMLElement,
    start: () => 'top top',
    end: () => 'bottom bottom',
    scrub: true,

    onUpdate: ({ direction, progress }) => {
      dir.value = direction

      const activeIndex =
        progress < interval
          ? 0
          : progress >= 1 - interval
            ? projectCount.value - 1
            : Math.floor(progress / interval)

      activeProject.value = activeIndex
    },
  })
}

onMounted(() => {
  makeAnimation()
})

onBeforeUnmount(() => {
  st.value?.kill(true)
})
</script>

<template>
  <section class="featured-projects">
    <div ref="contentRef" class="featured-projects__scroll-wrapper">
      <div class="featured-projects__content">
        <div class="featured-projects__bg-wrapper">
          <CustomImage
            v-for="(item, idx) in projects"
            :key="idx"
            :src="item?.content?.cover?.filename"
            :alt="item?.content?.cover?.alt"
            class="featured-projects__bg"
            :style="{ zIndex: idx + 1 }"
            :class="{ active: activeProject >= idx }"
          />
        </div>
        <NuxtLink
          class="featured-projects__link featured-projects__link--mob underline-reverse"
          to="/projects/"
          >{{ content?.button_text }}</NuxtLink
        >
        <div class="featured-projects__card fpc">
          <div class="fpc__assets">
            <div
              v-for="(item, idx) in projects"
              :key="idx"
              class="fpc__image-item"
              :class="{ active: activeProject >= idx }"
              :style="{ zIndex: idx + 1 }"
            >
              <div class="fpc__img-wrapper">
                <CustomImage
                  :src="item?.content?.cover?.filename"
                  :alt="item?.content?.cover?.alt"
                  class="fpc__img"
                />
              </div>
            </div>
          </div>
          <div class="fpc__specs-wrapper">
            <div
              v-for="(item, idx) in projects"
              :key="idx"
              class="fpc__specs"
              :class="{ active: activeProject === idx }"
            >
              <h2 class="fpc__title">
                {{ item?.content?.name }}
              </h2>
              <div class="fpc__spec">{{ item?.content?.spec_1 }}</div>
              <div class="fpc__spec">{{ item?.content?.spec_2 }}</div>
              <div class="fpc__spec">{{ item?.content?.spec_3 }}</div>
              <NuxtLink :to="`/${item.full_slug}`" class="fpc__link">
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
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="featured-projects__text">
          <h2 class="featured-projects__title">{{ content?.title }}</h2>
          <div class="featured-projects__desc">{{ content?.text }}</div>
          <NuxtLink
            class="featured-projects__link underline-reverse"
            to="/projects/"
            >{{ content?.button_text }}</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.featured-projects {
  position: relative;
}

.featured-projects__bg-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
}

.featured-projects__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;
  transition: transform 3s $easing;
  transform-origin: center top;
  transform: translateY(100%) scale(1.3);
  will-change: transform;

  &.active {
    transform: translateY(0) scale(1);
  }
}

.featured-projects__scroll-wrapper {
  position: relative;
  height: 500vh;
}

.featured-projects__content {
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: vh(100) 0;
  gap: vw(100);
  padding-left: vw(155);
  padding-right: vw(97);

  @media (max-width: $br1) {
    flex-direction: column-reverse;
    gap: 32px;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    padding-left: 15px;
    padding-right: 15px;
  }
}

.fpc {
  flex: 0 1 auto;
  height: clamp(50%, vh(684), vw(684));
  aspect-ratio: 0.72;
  max-width: 100%;

  background-color: var(--neutral-400);
  position: relative;
  z-index: 2;
  padding: vw(16);
  display: flex;
  flex-direction: column;

  @media (max-width: $br1) {
    width: auto;
    height: 61%;
    padding: 16px;
  }
}

.fpc__assets {
  flex: 0 1 auto;
  overflow: hidden;
  position: relative;
  height: 100%;
}

.fpc__image-item {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  transition: transform 3s $easing;
  transform-origin: center top;
  transform: translateY(100%) scale(1.3);
  will-change: transform;

  &:first-child {
    position: relative;
  }

  &.active {
    transform: translateY(0) scale(1);
  }
}

.fpc__img-wrapper {
  width: 100%;
  height: 100%;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.fpc__specs-wrapper {
  position: relative;
  flex: 1 0 auto;
}

.fpc__specs {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  margin-top: vw(24);

  &.active {
    position: relative;
    opacity: 1;
  }
  @media (max-width: $br1) {
    margin-top: 20px;
  }
}

.fpc__title {
  text-transform: uppercase;
  margin-bottom: vw(16);
  @include subheading-h2;
  @media (max-width: $br1) {
    margin-top: 8px;
  }
}

.fpc__spec {
  color: var(--neutral-200);
  @include med;
  font-size: vw(16);
  line-height: 1.3em;

  @media (max-width: $br1) {
    font-size: size(16, 14);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.fpc__link {
  display: block;
  color: var(--accent-primary);

  margin-top: vw(16);

  @media (max-width: $br1) {
    margin-top: 12px;
  }
}

.featured-projects__text {
  width: vw(440);
  position: relative;
  z-index: 2;
  @media (max-width: $br1) {
    text-align: center;
    width: 100%;
  }
}

.featured-projects__title {
  text-transform: uppercase;
  @include heading-h3;
}
.featured-projects__desc {
  margin-top: vw(16);

  @include text-t3;
  @media (max-width: $br1) {
    display: none;
  }
}

.featured-projects__link {
  position: relative;
  width: fit-content;
  display: block;
  text-transform: uppercase;
  margin-top: vw(48);
  @include caption-c1;

  @media (min-width: $br1) {
    &--mob {
      display: none;
    }
  }

  @media (max-width: $br1) {
    margin: 0 auto;
    margin-top: 8px;
    &:not(&--mob) {
      display: none;
    }
  }
}
</style>
