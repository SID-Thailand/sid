<script lang="ts" setup>
import type { iConsultingService } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingService
}

const props = defineProps<IProps>()

const contentRef = ref<HTMLElement | null>(null)

const itemsCount = computed(() => props?.content?.service?.length || 0)

const isMobile = computed(() => window.innerWidth < 768)

const { activePage } = useFullPageAnimation(
  contentRef as Ref<HTMLElement>,
  itemsCount,
  isMobile
)
</script>

<template>
  <section class="cons-service">
    <div class="cons-service__wrapper container">
      <div class="cons-service__top">
        <p class="cons-service__subtitle">
          {{ content?.subtitle }}
        </p>
        <h2 class="cons-service__title">
          {{ content?.title }}
        </h2>
      </div>
      <div ref="contentRef" class="cons-service__block">
        <div class="cons-service__block-wrapper">
          <div ref="assetsRef" class="cons-service__assets">
            <div
              v-for="(item, idx) in content?.service"
              :key="idx"
              class="cons-service__image-item"
            >
              <div class="cons-service__img-wrapper">
                <CustomImage
                  data-f-asset
                  :src="item?.asset?.filename"
                  :alt="item?.asset?.alt"
                  class="cons-service__img"
                />
              </div>
            </div>
          </div>
          <div class="cons-service__content-mask">
            <div data-f-scroller class="cons-service__content">
              <div
                v-for="(item, idx) in content?.service"
                :key="idx"
                data-f-text
                class="cons-service__content-wrapper"
                :style="{ zIndex: idx + 1 }"
                :class="
                  idx === activePage - 1 &&
                  'cons-service__content-wrapper--active'
                "
              >
                <div class="cons-service__item">
                  <div class="cons-service__line" />
                  <div class="cons-service__item-wrapper">
                    <IconsPlus class="cons-service__plus" />
                    <div class="cons-service__info">
                      <h3 class="cons-service__item-title">
                        {{ item?.text }}
                      </h3>
                    </div>
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

<style lang="scss">
.cons-service {
  position: relative;
  padding: vw(40) 0;
  background-color: var(--neutral-600);
  color: var(--basic-white);

  @media (max-width: $br1) {
    padding: 24px 0;
  }
}

.cons-service__top {
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

.cons-service__subtitle {
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

.cons-service__title {
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

.cons-service__block {
  position: relative;
  color: var(--basic-white);
}

.cons-service__block-wrapper {
  height: 100svh;
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

.cons-service__assets {
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

.cons-service__content-mask {
  @media (max-width: $br1) {
    overflow: hidden;
    margin-top: 40px;
  }
}

.cons-service__content {
  position: relative;
}

.cons-service__content-wrapper {
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
    .cons-service__plus {
      opacity: 1;
    }

    .cons-service__item-title {
      color: var(--basic-white);
    }
  }
}

.cons-service__image-item {
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

.cons-service__img-wrapper {
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.cons-service__img {
  position: relative;
  display: block;
  width: 100%;
  height: auto;

  will-change: transform;
}

.cons-service__item {
  @media (min-width: $br1) {
    width: vw(630);
    padding-bottom: vw(24);
  }
}

.cons-service__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--neutral-300);
}

.cons-service__item-wrapper {
  display: flex;
  align-items: flex-start;
  gap: vw(12);
  margin-top: vw(24);

  @media (max-width: $br1) {
    gap: 16px;
    margin-top: 20px;
  }
}

.cons-service__plus {
  display: block;
  width: vw(16);
  height: vw(16);
  opacity: 0;
  transition: opacity 0.3s ease;

  @media (max-width: $br1) {
    width: 16px;
    height: 16px;
  }

  path {
    fill: var(--basic-white);
  }
}

.cons-service__info {
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

.cons-service__item-title {
  text-transform: uppercase;
  font-size: vw(24);
  line-height: 1em;
  color: var(--neutral-300);
  transition: color 0.3s ease;
  @include med;

  @media (max-width: $br1) {
    font-size: size(24, 18);
  }

  @media (max-width: $br4) {
    font-size: 18px;
  }
}
</style>
