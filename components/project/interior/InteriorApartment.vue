<script lang="ts" setup>
import { gsap } from '~/libs/gsap'
import type { iApartment } from '~/types/currentProjectTypes'
import type { iImage } from '~/types/story'

interface IProps {
  apartment: iApartment
}

defineProps<IProps>()

const activeIdx = ref(0)

const sliderRef = useTemplateRef<HTMLUListElement | null>('sliderRef')
const sliderContainerRef = useTemplateRef<HTMLDivElement | null>(
  'sliderContainerRef'
)

const isFullImageModalOpened = ref(false)
const selectedImage = ref<iImage | null>(null)

const isMobile = useMediaQuery('(max-width: 860px)')

const slideTo = (idx: number) => {
  if (!sliderRef.value || !sliderContainerRef.value) return

  if (!isMobile.value) return

  const target = sliderRef.value.children[idx] as HTMLElement
  if (!target) return

  const gap = parseFloat(getComputedStyle(sliderRef.value).gap) || 0
  const itemWidth = target.getBoundingClientRect().width + gap

  gsap.to(sliderRef.value, {
    duration: 1,
    x: -itemWidth * idx,
    ease: 'power2.out',
  })

  activeIdx.value = idx
}

const handleModal = (_e: MouseEvent, img: iImage, idx: number) => {
  selectedImage.value = img
  if (idx === activeIdx.value || !isMobile.value) {
    isFullImageModalOpened.value = true
    return
  }
  slideTo(idx)
}

const handleCloseFullImageModal = () => {
  isFullImageModalOpened.value = false
  selectedImage.value = null
}

useSwipe(sliderContainerRef, {
  threshold: 50,
  onSwipeEnd: (_, direction) => {
    if (direction === 'left') {
      slideTo(activeIdx.value + 1)
    } else if (direction === 'right') {
      slideTo(activeIdx.value - 1)
    }
  },
})
</script>

<template>
  <div class="interior-apart">
    <slot />
    <h3 class="interior-apart__name interior-apart__name--mob">
      {{ apartment?.name }}
    </h3>
    <p class="interior-apart__desc interior-apart__desc--mob">
      {{ apartment?.price }}
    </p>
    <div ref="sliderContainerRef" class="interior-apart__img-list-wrapper">
      <ul ref="sliderRef" class="interior-apart__img-list">
        <ProjectInteriorApartmentImg
          v-for="(img, index) in apartment.assets"
          :key="img._uid"
          :img="img"
          :idx="index"
          @open="handleModal($event, img, index)"
        />
      </ul>
    </div>
    <ModalsImageSliderModal
      :is-open="isFullImageModalOpened"
      :images="apartment?.assets"
      :selected-image="selectedImage"
      @close="handleCloseFullImageModal"
    />
  </div>
</template>

<style lang="scss">
.interior-apart {
  display: flex;
  align-items: flex-start;
  color: var(--basic-black);

  @media (max-width: $br1) {
    flex-direction: column;
    gap: 0;
    margin-top: 16px;
  }
}

.interior-apart__img-list-wrapper {
  position: relative;

  @media (min-width: $br1) {
    width: vw(900);
  }

  @media (max-width: $br1) {
    position: relative;
    width: 100vw;
    margin-top: 40px;
    padding-right: 32px;
    padding-left: 32px;
    margin-left: -32px;
  }

  @media (max-width: $br3) {
    padding-right: 16px;
    padding-left: 16px;
    margin-left: -16px;
  }
}

.interior-apart__img-list {
  position: relative;
  width: 100%;

  @media (max-width: $br1) {
    display: flex;
    align-items: flex-start;
    min-width: max-content;
    gap: 16px;
  }
}

.interior-apart__content {
  margin-top: vw(24);

  @media (min-width: $br1) {
    width: vw(382);
  }

  @media (max-width: $br1) {
    margin-top: 48px;
    width: 100%;
  }
}

.interior-apart__name {
  font-size: vw(40);
  text-transform: uppercase;
  @include med;

  @media (max-width: $br1) {
    display: none;
  }

  &--mob {
    display: none;

    @media (max-width: $br1) {
      display: block;
      font-size: size(40, 36);
    }

    @media (max-width: $br4) {
      font-size: 36px;
    }
  }
}

.interior-apart__desc {
  text-transform: uppercase;
  margin-top: vw(26);
  @include subheading-h2;

  @media (max-width: $br1) {
    display: none;
  }

  &--mob {
    display: none;

    @media (max-width: $br1) {
      display: block;
      margin-top: 16px;
    }
  }
}

.interior-apart__about {
  @media (min-width: $br1) {
    margin-top: vw(35);
  }
}

.interior-apart__about-wrapper {
  text-transform: uppercase;
  @include subheading-h5;

  &:not(:first-child) {
    margin-top: vw(16);

    @media (max-width: $br1) {
      margin-top: 16px;
    }
  }
}

.interior-apart__about-content {
  display: flex;
  align-items: flex-start;
  gap: vw(20);
  margin-top: vw(8);

  @media (max-width: $br1) {
    margin-top: 8px;
    gap: 20px;
  }
}

.interior-apart__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--basic-black);
}

.interior-apart__title {
  max-width: vw(100);
  width: 100%;
  flex: 1 0 auto;

  @media (max-width: $br1) {
    max-width: 100px;
  }
}

.interior-apart__text {
  position: relative;
  line-height: 1.25em !important;

  &::before {
    bottom: 0;
  }
}
</style>
