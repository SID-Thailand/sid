<script setup lang="ts">
import type { iCompanyDirections } from '~/types/story'

interface IProps {
  content: iCompanyDirections
}

const props = defineProps<IProps>()

// DOM Refs
const contentRef = ref<HTMLElement | null>(null)

const itemsCount = computed(() => props?.content?.directions?.length || 0)

const { activePage, direction } = useFullPageAnimation(
  contentRef as Ref<HTMLElement>,
  itemsCount,
  true
)
</script>

<template>
  <section class="interview container">
    <div class="interview__wrapper">
      <div class="interview__title-wrapper">
        <h2 class="interview__title">{{ content?.title }}</h2>
      </div>
      <div
        ref="contentRef"
        class="interview__block"
        :style="{ '--direction': direction === 1 ? 'normal' : 'reverse' }"
      >
        <div class="interview__block-wrapper">
          <div class="interview__assets">
            <div
              v-for="(item, idx) in content?.directions"
              :key="idx"
              class="interview__image-item"
            >
              <div class="interview__img-wrapper">
                <CustomImage
                  data-f-asset
                  :src="item?.asset?.filename"
                  :alt="item?.asset?.alt"
                  class="interview__img"
                />
              </div>
            </div>
          </div>
          <div class="interview__content-mask">
            <div data-f-scroller class="interview__content">
              <div
                v-for="(item, idx) in content?.directions"
                :key="idx"
                data-f-text
                class="interview__content-wrapper"
                :class="
                  idx === activePage - 1 && 'interview__content-wrapper--active'
                "
                :style="{ zIndex: idx + 1 }"
              >
                <div class="interview__item">
                  <div class="interview__line" />
                  <div class="interview__info">
                    <h3 class="interview__item-title">{{ item?.title }}</h3>
                    <p class="interview__item-text">{{ item?.description }}</p>
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
.interview {
  position: relative;
  height: 100%;
  padding-top: vw(40);

  background-color: var(--neutral-600);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
}

.interview__title-wrapper {
  @media (min-width: $br4) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: vw(140);
  }
}

.interview__title {
  font-size: vw(88);
  text-transform: uppercase;
  line-height: 1em;
  @include med;

  @media (min-width: $br1) {
    width: vw(785);
  }

  @media (max-width: $br1) {
    font-size: size(88, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.interview__block {
  position: relative;
}

.interview__block-wrapper {
  top: 0;
  height: 100svh;

  padding-top: vw(60);

  @media (min-width: $br4) {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: $br4) {
    padding-top: 16px;
  }
}

.interview__assets {
  position: relative;
  width: vw(440);
  height: vw(440);
  max-height: 90%;

  @media (max-width: $br4) {
    margin: 0 auto;
    height: auto;
    aspect-ratio: 1;

    width: 100%;
    max-height: none;
    z-index: 10;
    background-color: var(--neutral-600);
  }
}

.interview__content-mask {
  @media (max-width: $br4) {
    overflow: hidden;
    margin-top: 40px;
  }
}

.interview__content {
  position: relative;

  @media (min-width: $br1) {
    width: vw(785);
  }

  @media (max-width: $br4) {
    display: flex;
    flex-direction: column;
    gap: 40px;

    overflow: hidden;
  }
}

.interview__content-wrapper {
  color: var(--neutral-300);

  @media (min-width: $br4) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    column-gap: vw(20);
  }

  &--active {
    color: var(--basic-white);

    .interview__item-text {
      color: var(--neutral-200);
    }
  }
}

.interview__image-item {
  position: absolute;
  left: 0;
  top: 0;
  text-transform: uppercase;
  height: 100%;
  @include subheading-h5;

  @media (min-width: $br4) {
    width: fit-content;
    max-width: vw(600);
  }
}

.interview__img-wrapper {
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.interview__img {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
}

.interview__item {
  @media (min-width: $br4) {
    width: vw(785);
    padding-bottom: vw(124);
  }
}

.interview__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--neutral-300);
  transition: background-color 2s $easing;
}

.interview__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: vw(16);
  gap: vw(20);

  @media (max-width: $br1) {
    flex-direction: column;
    margin-top: 16px;
    gap: 12px;
    max-width: 80%;
  }

  @media (max-width: $br4) {
    max-width: 100%;
  }
}

.interview__item-title {
  text-transform: uppercase;
  transition: color 2s $easing;
  width: 100%;
  flex: 1 0 auto;
  @include subheading-h1;

  @media (min-width: $br1) {
    max-width: vw(268);
  }
}

.interview__item-text {
  transition: color 2s $easing;
  line-height: 1.25em !important;
  font-size: vw(16);
  color: var(--neutral-300);
  @include med;

  @media (max-width: $br1) {
    font-size: 16px;
  }
}
</style>
