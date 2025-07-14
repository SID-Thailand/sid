<script lang="ts" setup>
import { gsap } from '~/libs/gsap'
import type { iCurrentProjectFacilities } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectFacilities
}

defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

useDetectHeaderColor($el as Ref<HTMLElement>)

const contentRef = ref<HTMLElement | null>(null)
const $assets = ref<NodeListOf<HTMLElement> | null>(null)
const activeIdx = ref(null)
const isAnimating = ref(false)

const initAnimation = () => {
  $assets.value = contentRef.value?.querySelectorAll(
    '[data-f-asset]'
  ) as NodeListOf<HTMLElement>

  if (!$assets.value) return

  $assets.value.forEach((item, index) => {
    if (index > 0) {
      gsap.set(item, {
        scale: 1.3,
        clipPath: 'inset(100% 0 0 0)',
      })
    }
  })
}

const hoverAnimation = (idx: number) => {
  if (window.innerWidth < 860) {
    return
  }

  if (isAnimating.value && activeIdx.value === idx) return

  const prevIdx = activeIdx.value
  activeIdx.value = idx

  if (prevIdx === null) return

  const $current = $assets.value[idx]
  const $prev = prevIdx !== null ? $assets.value[prevIdx] : null

  if (!$current || idx === prevIdx) return

  const dir = prevIdx > idx ? -1 : 1
  const length = $assets.value.length

  const hoverTL = gsap.timeline({
    defaults: {
      duration: 1.5,
      // overwrite: true,
    },
  })

  $assets.value.forEach((a, i) => {
    if (i === idx) {
      hoverTL.set(a.parentElement, {
        zIndex: length + 1,
      })
      return
    }

    if (i === prevIdx) {
      hoverTL.set(a.parentElement, {
        zIndex: length,
      })
      return
    }

    hoverTL.set(a.parentElement, {
      zIndex: dir === 1 ? i : length - i,
    })
  })

  hoverTL.set($current, {
    scale: 1.3,
    clipPath: 'inset(100% 0 0 0)',
  })

  if ($prev) {
    hoverTL.to(
      $prev,
      {
        scale: 1.3,
        clipPath: `inset(0 0 0 0)`,
      },
      0
    )
  }

  hoverTL.to(
    $current,
    {
      display: 'block',
      scale: 1,
      clipPath: 'inset(0% 0 0 0)',
      onComplete: () => {
        isAnimating.value = false
      },
    },
    0
  )

  isAnimating.value = true
}

onMounted(async () => {
  await nextTick()

  if (!contentRef.value) return
  initAnimation()
})
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
          <div class="project-facilities__assets">
            <div
              v-for="(item, idx) in content?.slider"
              :key="idx"
              class="project-facilities__image-item"
            >
              <CustomImage
                data-f-asset
                :src="item?.asset?.filename"
                :alt="item?.asset?.alt"
                class="project-facilities__img"
              />
            </div>
          </div>
          <div class="project-facilities__content-c">
            <div class="project-facilities__content">
              <div
                v-for="(item, idx) in content?.slider"
                :key="idx"
                data-f-text
                class="project-facilities__content-wrapper"
                @mouseenter="hoverAnimation(idx)"
              >
                <div aria-hidden="true" class="project-facilities__overlay" />
                <div class="project-facilities__item">
                  <CustomImage
                    :src="item?.asset?.filename"
                    :alt="item?.asset?.alt"
                    class="project-facilities__img project-facilities__img--mob"
                  />
                  <div class="project-facilities__line" />
                  <div class="project-facilities__item-wrapper">
                    <IconsPlus class="project-facilities__plus" />
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
    </div>
  </section>
</template>

<style lang="scss">
.project-facilities {
  position: relative;
  padding: vw(40) 0;
  background-color: var(--neutral-100);
  color: var(--basic-black);

  @media (max-width: $br1) {
    padding: 24px 0;
    padding-bottom: 0;
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
    display: none;
  }
}

.project-facilities__content-c {
  @media (max-width: $br1) {
    margin-top: 40px;
    overflow: hidden;
  }
}

.project-facilities__content {
  position: relative;
}

.project-facilities__content-wrapper {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  @media (min-width: $br1) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    column-gap: vw(20);
  }

  &:hover {
    @media (min-width: $br1) {
      .project-facilities__plus {
        opacity: 1;
        path {
          fill: var(--basic-white);
        }
      }

      .project-facilities__item-title {
        color: var(--basic-white);
      }

      .project-facilities__overlay {
        transform: scaleX(1);
      }
    }
  }
}

.project-facilities__overlay {
  position: absolute;
  left: 0;
  z-index: 0;
  transition: all 0.8s ease;
  transform: scaleX(0);
  transform-origin: left center;
  transition-property: transform;

  width: 100%;
  height: 100%;
  background-color: var(--neutral-500);
  z-index: 0;

  @media (max-width: $br1) {
    display: none;
  }
}

.project-facilities__image-item {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  max-width: vw(600);
}

.project-facilities__img {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  // transform-origin: center top;
  will-change: transform;
  &--mob {
    @media (min-width: $br1) {
      display: none;
    }
  }

  @media (max-width: $br1) {
    margin-bottom: 24px;
  }
}

.project-facilities__item {
  position: relative;
  z-index: 1;
  @media (min-width: $br1) {
    width: vw(630);
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
  padding: vw(24) vw(20);

  @media (max-width: $br1) {
    gap: 16px;
    padding: 0;
    padding-top: 24px;
    padding-bottom: 56px;
  }
}

.project-facilities__plus {
  display: block;
  color: var(--basic-black);
  width: vw(17);
  height: vw(17);
  opacity: 0;
  transition:
    opacity 0.8s ease,
    fill 0.8s ease;
  flex: 1 0 auto;

  @media (max-width: $br1) {
    display: none;
  }
}

.project-facilities__info {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: vw(8);
  flex: 0 1 auto;
  width: 100%;

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
  transition: color 0.8s ease;
  @include med;

  @media (max-width: $br1) {
    font-size: size(24, 18);
    // margin-top: 24px;
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
