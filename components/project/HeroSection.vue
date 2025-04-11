<script lang="ts" setup>
import { LucidePlus } from 'lucide-vue-next'
import type { iProjectContent } from '~/types/story'

interface IProps {
  content: iProjectContent
}

const props = defineProps<IProps>()

const { spec_1, spec_2, spec_3 } = props.content

const specs = computed(() => [spec_1, spec_2, spec_3].filter(Boolean))
</script>

<template>
  <section class="project-hero">
    <div class="project-hero__wrapper container">
      <ParallaxImg
        :src="content?.cover?.filename"
        :alt="content?.cover?.alt"
        data-preload="true"
        class="project-hero__img"
      />
      <div class="project-hero__content">
        <h1 data-title class="project-hero__title">{{ content?.name }}</h1>
        <ul class="project-hero__list">
          <li
            v-for="(item, idx) in specs"
            :key="idx"
            class="project-hero__item"
          >
            <p class="project-hero__text">
              {{ item }}
            </p>
            <span v-if="specs?.length - 1 !== idx">|</span>
          </li>
        </ul>
        <Button type="button" class="project-hero__btn">
          <span>WHATSAPP</span>
          <LucidePlus />
        </Button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-hero {
  position: relative;
  height: 100dvh;
}

.project-hero__wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.project-hero__img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.project-hero__content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  row-gap: vw(16);

  @media (max-width: $br1) {
    row-gap: 50px;
  }
}

.project-hero__title {
  text-transform: uppercase;
  text-align: center;
  @include heading-h1;
}

.project-hero__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;

  @media (max-width: $br1) {
    gap: 20px;
  }
}

.project-hero__item {
  display: flex;
  align-items: center;
  span {
    margin: 0 vw(20);

    @media (max-width: $br1) {
      display: none;
    }
  }
}

.project-hero__text {
  font-size: vw(20);
  text-transform: uppercase;
  line-height: 1.2em;
  @include med;

  @media (max-width: $br1) {
    font-size: size(20, 14);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}

.project-hero__btn {
  position: absolute !important;
  bottom: vw(85);

  @media (max-width: $br1) {
    bottom: 48px;
  }
}
</style>
