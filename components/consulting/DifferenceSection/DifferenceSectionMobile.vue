<script lang="ts" setup>
import type { iConsultingDifference } from '~/types/consultingTypes'

interface IProps {
  content: iConsultingDifference
}

defineProps<IProps>()
</script>

<template>
  <div class="cons-diff__mob cons-diff-mob">
    <ul class="cons-diff-mob__items">
      <li
        v-for="(item, index) in content?.difference_gallery"
        :key="index"
        class="cons-diff-mob__item"
      >
        <div class="cons-diff-mob__item-bg">
          <CustomImage
            :src="item?.background_asset?.filename"
            :alt="item?.background_asset?.alt"
            :width="1920"
            class="cons-diff-mob__bg"
          />
          <DarkLayer />
        </div>
        <CustomImage
          :src="item?.asset?.filename"
          :alt="item?.asset?.alt"
          :width="860"
          class="cons-diff-mob__img"
        />
        <h3 class="cons-diff-mob__item-title">{{ item?.title }}</h3>
        <p class="cons-diff-mob__item-text">{{ item?.text }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.cons-diff-mob__item {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cons-diff-mob__item-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.cons-diff-mob__bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cons-diff-mob__item-title {
  margin-top: 32px;
  text-transform: uppercase;
  @include heading-h3;
}
.cons-diff-mob__item-text {
  margin-top: 20px;
  @include text-t3;
}
.cons-diff-mob__img {
  aspect-ratio: 1;
  max-width: 460px;
  width: 100%;
  object-fit: cover;
}
</style>
