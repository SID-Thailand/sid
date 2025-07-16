<script lang="ts" setup>
import type { iHomeNumber } from '~/types/homeTypes'

interface IProps {
  card: iHomeNumber
}

defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

useDetectHeaderColor($el as Ref<HTMLElement>)
</script>

<template>
  <li ref="$el" class="numbers-stat__card">
    <div class="numbers-stat__info">
      <h3 class="numbers-stat__number">{{ card?.value }}</h3>
      <p class="numbers-stat__desc" v-html="card?.description" />
    </div>
    <ParallaxImg
      :src="card?.asset?.filename"
      :alt="card?.asset?.alt"
      :width="600"
      class="numbers-stat__img"
    />
  </li>
</template>

<style scoped lang="scss">
.numbers-stat__card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: vw(24);
  position: relative;
  padding: vw(16);
  padding-top: vw(20);
  background-color: var(--basic-white);
  width: 100%;
  height: fit-content;
  color: var(--basic-black);

  &:nth-child(2),
  &:nth-child(4) {
    @media (min-width: $br1) {
      margin-top: vw(240);
    }
  }

  @media (max-width: $br1) {
    gap: 20px;
    padding: 16px;
  }
}

.numbers-stat__number {
  @include heading-h2;
}

.numbers-stat__desc {
  text-transform: lowercase;
  margin-top: vw(8);
  @include text-t1;

  @media (max-width: $br1) {
    margin-top: 8px;
  }
}

.numbers-stat__img {
  display: block;
  aspect-ratio: 1;
  width: 100%;
  object-fit: cover;
}
</style>
