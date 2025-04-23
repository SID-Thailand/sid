<script lang="ts" setup>
import { LucidePlus } from 'lucide-vue-next'
import type { iCurrentProjectFacilities } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectFacilities
}

const props = defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

useDetectHeaderColor($el as Ref<HTMLElement>)

const contentRef = ref<HTMLElement | null>(null)

const activeIdx = ref(0)

const itemsCount = computed(() => props.content?.slider?.length || 0)

const { activePage, prevPage, direction } = useFullPage(
  contentRef as Ref<HTMLElement>,
  itemsCount
)
</script>

<template>
  <section ref="$el" class="project-facilities">
    <div class="project-facilities__wrapper container">
      <div class="project-facilities__top">
        <p class="project-facilities__subtitle">
          {{ content?.subtitle }}
        </p>
        <h2 class="project-facilities__title">
          {{ content?.title }}
        </h2>
      </div>
      <div ref="contentRef" class="project-facilities__block">
        <div class="project-facilities__block-wrapper">
          <div ref="assetsRef" class="project-facilities__assets">
            <div
              v-for="(item, idx) in content?.slider"
              :key="idx"
              class="project-facilities__image-item"
              :class="
                idx === activeIdx && 'project-facilities__image-item--active'
              "
            >
              <div
                class="project-facilities__img-wrapper"
                :class="
                  idx <= activeIdx && 'project-facilities__img-wrapper--active'
                "
              >
                <CustomImage
                  :src="item?.asset?.filename"
                  :alt="item?.asset?.alt"
                  class="project-facilities__img"
                />
              </div>
            </div>
          </div>
          <div ref="projectContentRef" class="project-facilities__content">
            <div
              v-for="(item, idx) in content?.slider"
              :key="idx"
              class="project-facilities__content-wrapper"
              :class="
                idx === activeIdx &&
                'project-facilities__content-wrapper--active'
              "
              :style="{ zIndex: idx + 1 }"
            >
              <div class="project-facilities__item">
                <div class="project-facilities__line" />
                <div class="project-facilities__item-wrapper">
                  <LucidePlus class="project-facilities__plus" />
                  <div class="project-facilities__info">
                    <h3 class="project-facilities__item-title">
                      {{ item?.title }}
                    </h3>
                    <p class="project-facilities__item-text">
                      {{ item?.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-facilities {
  position: relative;
  padding: vw(40) 0;
  background-color: var(--neutral-100);
  color: var(--basic-black);

  @media (max-width: $br1) {
    padding: 24px 0;
  }
}

.project-facilities__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  column-gap: vw(20);
  width: 100%;

  @media (max-width: $br1) {
    flex-direction: column;
    column-gap: 16px;
  }
}

.project-facilities__subtitle {
  font-size: vw(20);
  line-height: 1.2em;
  text-transform: uppercase;
  @include med;

  @media (max-width: $br1) {
    font-size: size(20, 14);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.project-facilities__title {
  font-size: vw(50);
  line-height: 1em;
  text-transform: uppercase;
  max-width: vw(630);
  @include med;

  @media (max-width: $br1) {
    max-width: 100%;
    margin-top: 40px;
    font-size: size(50, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.project-facilities__block {
  position: relative;
  color: var(--basic-black);
}

.project-facilities__block-wrapper {
  height: 100vh;
  overflow: hidden;
  padding-top: vw(60);

  @media (min-width: $br1) {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: $br1) {
    margin-top: 40px;
    padding-top: 0px;
  }
}

.project-facilities__assets {
  position: relative;
  width: vw(440);
  height: vw(440);

  @media (max-width: $br1) {
    margin-top: 16px;
    width: 100%;
    aspect-ratio: 440 / 440;
    height: auto;
    z-index: 10;
    background-color: var(--neutral-100);
  }
}

.project-facilities__content {
  position: relative;
}

.project-facilities__content-wrapper {
  @media (min-width: $br1) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    column-gap: vw(20);
  }

  @media (max-width: $br1) {
    &:not(:first-child) {
      margin-top: 24px;
    }
  }

  &--active {
    .project-facilities__plus {
      opacity: 1;
    }
  }
}

.project-facilities__image-item {
  position: absolute;
  left: 0;
  top: 0;
  text-transform: uppercase;
  @include subheading-h5;

  @media (min-width: $br1) {
    width: 100%;
    height: 100%;
    max-width: vw(600);
  }

  @media (max-width: $br1) {
    width: 100%;
    height: auto;
  }
}

.project-facilities__img-wrapper {
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  &--active {
    .project-facilities__img {
      transform: translateY(0) scale(1);
    }
  }
}

.project-facilities__img {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  transition: transform 3s $easing;
  transform-origin: center top;
  transform: translateY(100%) scale(1.3);
  will-change: transform;
}

.project-facilities__item {
  @media (min-width: $br1) {
    width: vw(630);
    padding-bottom: vw(24);
  }
}

.project-facilities__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--basic-black);
}

.project-facilities__item-wrapper {
  display: flex;
  align-items: flex-start;
  gap: vw(12);
  margin-top: vw(24);

  @media (max-width: $br1) {
    gap: 16px;
    margin-top: 20px;
  }
}

.project-facilities__plus {
  display: block;
  color: var(--basic-black);
  width: vw(20);
  height: vw(20);
  opacity: 0;
  transition: opacity 0.3s ease;

  @media (max-width: $br1) {
    width: 16px;
    height: 16px;
  }
}

.project-facilities__info {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: vw(8);

  @media (max-width: $br1) {
    gap: 4px;
  }

  @media (max-width: $br4) {
    max-width: 100%;
  }
}

.project-facilities__item-title {
  text-transform: uppercase;
  font-size: vw(24);
  line-height: 1em;
  @include med;

  @media (max-width: $br1) {
    font-size: size(24, 18);
  }

  @media (max-width: $br4) {
    font-size: 18px;
  }
}

.project-facilities__item-text {
  line-height: 1.25em !important;
  color: var(--neutral-300);
  @include text-t4;
}
</style>
