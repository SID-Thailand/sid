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

const { throttledNavigate, current, prev } = useSliderAnimation(
  contentRef,
  count
)

onMounted(() => {
  prev.value = count.value - 1
})
</script>

<template>
  <div ref="contentRef" class="cons-diff__slider container">
    <div class="cons-diff__bgs">
      <div
        v-for="(img, idx) in content?.difference_gallery"
        :key="idx"
        data-f-bg
        class="cons-diff__bg-wrapper"
        :class="{ active: idx === current, prev: idx === prev }"
      >
        <CustomImage
          data-f-bg-i
          :src="img?.background_asset?.filename"
          :alt="img?.background_asset?.alt"
          class="cons-diff__bg"
          :width="1920"
        />
      </div>
      <DarkLayer style="z-index: 3" />
    </div>

    <div class="cons-diff__content">
      <div class="cons-diff__texts">
        <ul v-if="content?.difference_gallery" class="cons-diff__items">
          <li
            v-for="item in content?.difference_gallery"
            :key="item._uid"
            class="cons-diff__item"
          >
            <h3 data-f-title class="cons-diff__t">
              {{ item?.title }}
            </h3>
            <p data-f-text class="cons-diff__text">
              {{ item?.text }}
            </p>
          </li>
        </ul>
      </div>
      <div class="cons-diff__assets">
        <div
          v-for="(img, idx) in content?.difference_gallery"
          :key="img._uid"
          data-f-img
          class="cons-diff__img-wrapper"
          :class="{ active: idx === current, prev: idx === prev }"
        >
          <CustomImage
            data-f-img-i
            :src="img?.asset?.filename"
            :alt="img?.asset?.alt"
            class="cons-diff__img"
            :width="700"
          />
        </div>
      </div>
    </div>

    <SliderFloatingNavigation @navigate="throttledNavigate" />
  </div>
</template>

<style scoped lang="scss">
.cons-diff__slider {
  position: relative;
  width: 100%;
  height: 100svh;
}

.cons-diff__bgs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 100%;
  z-index: 1;
}

.cons-diff__bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 100%;
  clip-path: inset(0px 0px 0px 100%);

  &.active {
    z-index: 2;
  }
  &.prev {
    z-index: 1;
  }

  &:first-child {
    clip-path: inset(0 0 0 0);
  }
}

.cons-diff__bg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cons-diff__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 2;
  position: relative;
  width: vw(784);
  margin: 0 auto;
  overflow: hidden;

  @media (max-width: $br1) {
    width: 80%;
  }

  @media (max-width: $br2) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 32px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 75%;
  }
}

.cons-diff__texts {
  width: vw(324);
  flex-shrink: 0;

  @media (max-width: $br2) {
    width: 100%;
  }
}
.cons-diff__items {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
}
.cons-diff__item {
  position: relative;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  gap: vw(32);
  top: 0;

  @media (max-width: $br2) {
    text-align: center;
  }
}
.cons-diff__t {
  text-transform: uppercase;
  @include heading-h6;

  @media (min-width: $br1) {
    text-align: left;
  }

  @media (max-width: $br1) {
    font-size: size(40, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}
.cons-diff__text {
  @include text-t3;
}

.cons-diff__assets {
  flex-shrink: 0;
  width: vw(326);
  height: vw(326);
  overflow: hidden;
  position: relative;
  z-index: 1;

  @media (max-width: $br2) {
    width: auto;
    height: 50%;
    aspect-ratio: 1;
  }
}

.cons-diff__img-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  &.active {
    z-index: 2;
  }
  &.prev {
    z-index: 1;
  }

  @media (max-width: $br2) {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
  }
}

.cons-diff__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
