<script setup lang="ts">
import type { iHomeFeaturedProjects } from '~/types/story'

interface IProps {
  content: iHomeFeaturedProjects
}

defineProps<IProps>()

const contentRef = ref<HTMLElement | null>(null)
const updateActiveHeight = () => {
  const activeEl = document.querySelector(
    '.featured-projects__card-wrapper--active'
  ) as HTMLElement
  activeEl &&
    contentRef.value?.style.setProperty(
      '--active-height',
      `${activeEl.offsetHeight}px`
    )
}

let observer: MutationObserver

onMounted(() => {
  updateActiveHeight()
  window.addEventListener('resize', updateActiveHeight)
  observer = new MutationObserver(updateActiveHeight)
  contentRef.value &&
    observer.observe(contentRef.value, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateActiveHeight)
  observer.disconnect()
})
</script>

<template>
  <section class="featured-projects">
    <CustomImage
      :src="content?.backdrop_asset?.filename"
      :alt="content?.backdrop_asset?.alt"
      class="featured-projects__bg"
    />
    <div class="featured-projects__wrapper">
      <h2 class="featured-projects__title featured-projects__title--mob">
        {{ content?.title }}
      </h2>
      <div ref="contentRef" class="featured-projects__card">
        <div
          v-for="(project, idx) in content?.featured_projects"
          :key="idx"
          class="featured-projects__card-wrapper"
          :class="idx === 1 && 'featured-projects__card-wrapper--active'"
        >
          <div class="featured-projects__plug">
            <CustomImage
              :src="project?.content?.cover?.filename"
              :alt="project?.content?.cover?.alt"
              class="featured-projects__card-img"
            />
            <h3 class="featured-projects__name">
              {{ project?.content?.name }}
            </h3>
            <div class="featured-projects__text-wrapper">
              <p class="featured-projects__small-text">
                {{ project?.content?.spec_1 }}
              </p>
              <p class="featured-projects__small-text">
                {{ project?.content?.spec_2 }}
              </p>
              <p class="featured-projects__small-text">
                {{ project?.content?.spec_3 }}
              </p>
            </div>
            <div class="featured-projects__plus">
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
      <div class="featured-projects__info">
        <h2 class="featured-projects__title">
          {{ content?.title }}
        </h2>
        <p class="featured-projects__desc">
          {{ content?.text }}
        </p>
        <NuxtLink :to="'/'" class="featured-projects__link underline-reverse">
          {{ content?.button_text }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.featured-projects {
  position: relative;
  padding: vw(200) 0;
  padding-left: vw(155);
  padding-right: vw(97);

  @media (max-width: $br1) {
    padding-left: $g-sm;
    padding-right: $g-sm;
    padding-top: 100px;
    padding-bottom: 100px;
  }

  @media (max-width: $br3) {
    padding-left: $g-s;
    padding-right: $g-s;
  }
}

.featured-projects__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-projects__wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: $br1) {
    flex-direction: column;
  }
}

.featured-projects__card {
  position: relative;
  max-width: vw(496);
  width: 100%;
  background-color: var(--neutral-400);

  height: var(--active-height);

  @media (max-width: $br1) {
    max-width: 100%;
    margin-top: 32px;
  }
}

.featured-projects__card-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  padding: vw(16);
  width: 100%;

  @media (max-width: $br1) {
    padding: 16px;
  }

  &--active {
    .featured-projects__card-img {
      opacity: 1;
    }

    .featured-projects__name {
      opacity: 1;
    }

    .featured-projects__text-wrapper {
      opacity: 1;
    }

    .featured-projects__plus {
      opacity: 1;
    }
  }
}

.featured-projects__plug {
  position: relative;
  pointer-events: none;
}

.featured-projects__card-img {
  width: 100%;
  height: vw(464);
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s $easing;

  @media (max-width: $br1) {
    height: 312px;
  }
}

.featured-projects__name {
  margin-top: vw(24);
  font-size: vw(24);
  text-transform: uppercase;
  line-height: 1em;
  opacity: 0;
  transition: opacity 0.3s $easing;
  @include med;

  @media (max-width: $br1) {
    margin-top: 20px;
    font-size: 24px;
  }
}

.featured-projects__text-wrapper {
  margin-top: vw(16);
  color: var(--neutral-200);
  opacity: 0;
  transition: opacity 0.3s $easing;
  @include text-t4;

  @media (max-width: $br1) {
    margin-top: 8px;
  }
}

.featured-projects__plus {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: vw(22);
  height: vw(22);
  margin-top: vw(17);
  opacity: 0;
  transition: opacity 0.3s $easing;

  @media (max-width: $br1) {
    width: 18px;
    height: 18px;
    margin-top: 12px;
  }

  span {
    position: absolute;
    display: block;
    width: 100%;
    height: vw(2);
    background-image: var(--accent-primary);

    &:first-child {
      transform: rotate(90deg);
    }

    @media (max-width: $br1) {
      height: 2px;
    }
  }
}

.featured-projects__info {
  max-width: vw(440);

  @media (max-width: $br1) {
    max-width: 100%;
    width: 100%;
  }
}

.featured-projects__title {
  text-transform: uppercase;
  @include heading-h3;

  @media (max-width: $br1) {
    display: none;
  }

  &--mob {
    display: none;

    @media (max-width: $br1) {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
}

.featured-projects__desc {
  color: var(--neutral-200);
  margin-top: vw(16);
  line-height: 1.2em !important;
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

  @media (max-width: $br1) {
    margin: 0 auto;
    margin-top: 40px;
  }
}
</style>
