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

// const activePage = ref(1)
</script>

<template>
  <div ref="contentRef" class="cons-diff__slider container">
    <div
      v-for="(img, idx) in content?.difference_gallery"
      :key="idx"
      class="cons-diff__bg-wrapper"
    >
      <CustomImage
        data-f-bg
        :src="img?.background_asset?.filename"
        :alt="img?.background_asset?.alt"
        class="cons-diff__bg"
        :width="1920"
      />
    </div>
    <DarkLayer />

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
          v-for="img in content?.difference_gallery"
          :key="img._uid"
          class="cons-diff__img-wrapper"
        >
          <CustomImage
            data-f-img
            :src="img?.asset?.filename"
            :alt="img?.asset?.alt"
            class="cons-diff__img"
            :width="700"
          />
        </div>
      </div>
    </div>
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
</template>

<style scoped lang="scss">
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
  overflow: hidden;
  height: 100%;
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
  z-index: 3;
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

.cons-diff__counter {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 2;

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
