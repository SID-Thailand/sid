<script setup lang="ts">
import type { iConsultingDifference } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingDifference
}

const props = defineProps<IProps>()

const contentRef = ref<HTMLElement | null>(null)

const count = computed(() => {
  return props.content?.difference_gallery?.length || 0
})

const { activePage } = useFullPageCardSlider(
  contentRef as Ref<HTMLElement>,
  count
)
</script>

<template>
  <section class="cons-diff">
    <div class="cons-diff__wrapper">
      <div class="cons-diff__title-wrapper container">
        <h2 class="cons-diff__title">
          {{ content?.title }}
        </h2>
      </div>
      <div ref="contentRef" class="cons-diff__slider container">
        <div
          v-for="(img, idx) in content?.difference_gallery"
          :key="idx"
          class="cons-diff__bg-wrapper"
        >
          <CustomImage
            data-f-bg
            :src="img?.background_asset?.filename"
            :aly="img?.background_asset?.alt"
            class="cons-diff__bg"
          />
          <div class="cons-diff__layer" />
        </div>
        <ul class="cons-diff__list">
          <li
            v-for="(item, index) in content?.difference_gallery"
            :key="index"
            class="cons-diff__item"
          >
            <div class="cons-diff__content">
              <h3 data-f-title class="cons-diff__item-title">
                {{ item?.title }}
              </h3>
              <p data-f-text class="cons-diff__item-text">
                {{ item?.text }}
              </p>
            </div>
            <div class="cons-diff__img-wrapper">
              <CustomImage
                data-f-img
                :src="item?.asset?.filename"
                :aly="item?.asset?.alt"
                class="cons-diff__img"
              />
            </div>
          </li>
        </ul>
        <div class="cons-diff__counter container">
          <p class="cons-diff__count">{{ activePage }}/{{ count }}</p>
          <div class="cons-diff__pagination">
            <span
              v-for="(_, i) in content?.difference_gallery?.length"
              :key="i"
              class="cons-diff__pag-item"
              :class="{ 'cons-diff__pag-item--active': activePage === i + 1 }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cons-diff__title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: vw(110);
  padding-bottom: vw(110);
  background-color: var(--neutral-600);
  color: var(--neutral-200);

  @media (max-width: $br1) {
    padding-top: 48px;
    padding-bottom: 48px;
  }
}
.cons-diff__title {
  text-align: center;
  text-transform: uppercase;
  @include heading-h3;

  @media (min-width: $br1) {
    max-width: vw(880);
  }
}

.cons-diff__slider {
  position: relative;
  width: 100%;
  height: 100svh;
}

.cons-diff__bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cons-diff__bg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cons-diff__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-image: linear-gradient(180deg, #3a3838 0%, #202020 100%);
  opacity: 0.5;
  mix-blend-mode: hard-light;
}

.cons-diff__list {
  position: relative;
  width: 100%;
  height: 100%;
}

.cons-diff__content {
  width: vw(324);

  @media (max-width: $br1) {
    width: 100%;
  }
}

.cons-diff__item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: vw(134);
  width: vw(784);

  @media (max-width: $br1) {
    text-align: center;
    flex-direction: column-reverse;
    width: 70%;
    gap: 32px;
    height: 70%;
  }

  @media (max-width: $br4) {
    width: 100%;
  }
}

.cons-diff__item-title {
  text-transform: uppercase;
  line-height: 1em;
  font-size: vw(40);
  @include med;

  @media (max-width: $br1) {
    font-size: size(40, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.cons-diff__item-text {
  margin-top: vw(32);
  @include text-t3;

  @media (max-width: $br1) {
    margin-top: 20px;
  }
}

.cons-diff__img-wrapper {
  flex-shrink: 0;
  width: vw(326);
  height: vw(326);
  overflow: hidden;
  @media (max-width: $br1) {
    height: 326px;
    width: auto;
    aspect-ratio: 1;
  }
}

.cons-diff__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cons-diff__counter {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: $br1) {
    flex-direction: column;
    height: 100%;
    padding: 32px 0;
  }
}

.cons-diff__count {
  text-transform: uppercase;
  line-height: 1.2em;
  font-size: vw(20);
  @include med;

  @media (max-width: $br1) {
    font-size: size(20, 16);
  }

  @media (max-width: $br4) {
    font-size: 16px;
  }
}

.cons-diff__pagination {
  display: flex;
  align-items: center;
  width: fit-content;

  @media (min-width: $br1) {
    flex-direction: column;
    row-gap: vw(8);
  }

  @media (max-width: $br1) {
    column-gap: 8px;
  }
}

.cons-diff__pag-item {
  display: block;
  width: vw(4);
  height: vw(4);
  border-radius: 9999px;
  background-color: var(--neutral-300);
  transition:
    height 1s ease,
    width 1s ease,
    background-color 1s ease;

  @media (max-width: $br1) {
    width: 4px;
    height: 4px;
  }

  &--active {
    background-color: var(--basic-white);

    @media (min-width: $br1) {
      height: vw(16);
    }

    @media (max-width: $br1) {
      width: 16px;
    }
  }
}
</style>
