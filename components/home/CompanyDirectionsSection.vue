<script setup lang="ts">
import type { iHomeCompanyDirections } from '~/types/story'

interface IProps {
  content: iHomeCompanyDirections
}

defineProps<IProps>()

const contentRef = ref<HTMLElement | null>(null)
const updateActiveHeight = () => {
  const activeEl = document.querySelector(
    '.interview__content-wrapper--active'
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
  <section class="interview container">
    <div class="interview__wrapper">
      <div class="interview__title-wrapper">
        <h2 class="interview__title">{{ content.title }}</h2>
      </div>
      <div ref="contentRef" class="interview__content">
        <div
          v-for="(item, idx) in content.directions"
          :key="idx"
          class="interview__content-wrapper"
          :class="idx === 0 && 'interview__content-wrapper--active'"
        >
          <div class="interview__image-item">
            <CustomImage
              :src="item.person_asset.filename"
              :alt="item.person_asset.alt"
              class="interview__img"
              draggable="false"
              data-gl="1"
              :is-storyblok="true"
              :is-webgl="true"
            />
            <div class="interview__desc-wrapper">
              <p class="interview__name">{{ item.person_title }}</p>
              <p class="interview__description">
                {{ item.person_description }}
              </p>
            </div>
          </div>

          <div class="interview__item">
            <div class="interview__line" />
            <div class="interview__info">
              <h3 class="interview__item-title">{{ item.title }}</h3>
              <p class="interview__item-text">{{ item.description }}</p>
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
  padding-bottom: vw(100);
  background-color: var(--neutral-600);

  @media (max-width: $br1) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
}

.interview__wrapper {
  height: 100%;
}

.interview__title-wrapper {
  @media (min-width: $br1) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(24, 1fr);
    column-gap: vw(20);
    grid-auto-flow: row;
  }
}

.interview__title {
  font-size: vw(88);
  text-transform: uppercase;
  line-height: 1em;
  @include med;

  @media (min-width: $br1) {
    @include col(11, 21);
  }

  @media (max-width: $br1) {
    font-size: size(88, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }
}

.interview__content {
  position: relative;
  margin-top: vw(200);
  height: fit-content;

  @media (max-width: $br1) {
    margin-top: 40px;
    height: var(--active-height);
  }
}

.interview__block {
  position: relative;
}

.interview__content-wrapper {
  @media (min-width: $br1) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(24, 1fr);
    column-gap: vw(20);
    grid-auto-flow: row;
  }
  @media (max-width: $br1) {
    position: absolute;
  }

  &--active {
    .interview__image-item {
      opacity: 1;
    }

    .interview__item {
      color: var(--basic-white);

      .interview__line {
        background-color: var(--basic-white);
      }
    }

    @media (max-width: $br1) {
      .interview__item {
        opacity: 1;
        color: var(--basic-white);

        .interview__line {
          background-color: var(--basic-white);
        }
      }
    }
  }
}

.interview__image-item {
  position: absolute;
  left: 0;
  top: 0;
  text-transform: uppercase;
  transition: opacity 0.3s $easing;
  opacity: 0;

  @include subheading-h5;

  @media (min-width: $br1) {
    @include col(1, 8);
    width: fit-content;
    max-width: vw(600);
  }

  @media (max-width: $br1) {
    position: relative;
    max-height: auto;
    height: 100%;
    line-height: 1.5em;
  }
}

.interview__img {
  display: block;
  width: 100%;
  height: auto;
}

.interview__name {
  margin-top: vw(16);

  @media (max-width: $br1) {
    margin-top: 16px;
  }
}

.interview__description {
  color: var(--neutral-300);
}

.interview__item {
  color: var(--neutral-300);
  transition: opacity 0.3s $easing;

  @media (min-width: $br1) {
    @include col(11, 24);
    width: 100%;
    min-height: vw(220);
    padding-bottom: vw(20);
  }

  @media (max-width: $br1) {
    opacity: 0;
    margin-top: 40px;
  }
}

.interview__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--neutral-300);
  transition: background-color 0.3s $easing;
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
  transition: color 0.3s $easing;
  width: 100%;
  flex: 1 0 auto;
  @include subheading-h1;

  @media (min-width: $br1) {
    max-width: vw(268);
  }
}

.interview__item-text {
  transition: color 0.3s $easing;
  line-height: 1.25em !important;
  @include text-t4;
}
</style>
