<script lang="ts" setup>
import { gsap } from '~/libs/gsap'
import type { iApartment } from '~/types/currentProjectTypes'

interface IProps {
  apartment: iApartment
}

defineProps<IProps>()

const sliderRef = ref<HTMLUListElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
const activeIdx = ref(0)

const isMobile = useMediaQuery('(max-width: 860px)')

const slideTo = (idx: number) => {
  if (!sliderRef.value || !containerRef.value) return

  if (!isMobile.value) return

  const slider = sliderRef.value
  const target = slider.children[idx] as HTMLElement
  if (!target) return

  const prevSlide = slider.children[activeIdx.value] as HTMLElement

  const direction = idx > activeIdx.value ? 1 : -1

  const prevSlideWidth = prevSlide.getBoundingClientRect().width

  const tl = gsap.timeline()

  const widthOffset = direction === 1 ? prevSlideWidth / 2 : 0

  const offsetLeft = target.offsetLeft - widthOffset
  tl.to(slider, {
    x: -offsetLeft,
    duration: 1.5,
    ease: 'power2.out',
  })

  activeIdx.value = idx
}

useSwipe(containerRef, {
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
    <h3 class="interior-apart__name interior-apart__name--mob">
      {{ apartment?.name }}
    </h3>
    <p class="interior-apart__desc interior-apart__desc--mob">
      {{ apartment?.price }}
    </p>
    <div ref="containerRef" class="interior-apart__img-list-wrapper">
      <ul ref="sliderRef" class="interior-apart__img-list">
        <ProjectInteriorApartmentImg
          v-for="(img, index) in apartment.assets"
          :key="img._uid"
          :img="img"
          :idx="index"
          :active="activeIdx === index"
          @click="slideTo(index)"
        />
      </ul>
    </div>
    <div class="interior-apart__content">
      <h3 class="interior-apart__name">
        {{ apartment?.name }}
      </h3>
      <p class="interior-apart__desc">
        {{ apartment?.price }}
      </p>
      <div class="interior-apart__about">
        <div class="interior-apart__about-wrapper">
          <div class="interior-apart__line" />
          <div class="interior-apart__about-content">
            <p class="interior-apart__title">Area</p>
            <p class="interior-apart__text">{{ apartment?.area }}</p>
          </div>
        </div>
        <div class="interior-apart__about-wrapper">
          <div class="interior-apart__line" />
          <div class="interior-apart__about-content">
            <p class="interior-apart__title">Info</p>
            <p class="interior-apart__text">{{ apartment?.info }}</p>
          </div>
        </div>
        <div class="interior-apart__about-wrapper">
          <div class="interior-apart__line" />
          <div class="interior-apart__about-content">
            <p class="interior-apart__title">Plan</p>
            <a
              v-if="apartment?.plan?.[0]"
              :href="apartment.plan[0]?.link?.url"
              target="_blank"
              rel="noopener noreferrer"
              class="interior-apart__text underline-reverse"
            >
              {{ apartment.plan[0]?.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.interior-apart {
  display: flex;
  align-items: flex-start;
  gap: vw(76);
  color: var(--basic-black);
  margin-top: vw(-23);

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
    overflow-x: auto;
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

  @media (min-width: $br1) {
    width: 100%;
  }

  @media (max-width: $br1) {
    display: flex;
    align-items: flex-start;
    min-width: max-content;
    gap: 16px;
    height: 222px;
  }
}

.interior-apart__content {
  margin-top: vw(46);

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
}
</style>
