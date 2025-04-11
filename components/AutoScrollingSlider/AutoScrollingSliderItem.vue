<script lang="ts" setup>
interface IProps {
  item: {
    filename: string
    alt: string
  }
  index: number
}

defineProps<IProps>()
</script>

<template>
  <div :data-slide="index" class="scrolling-slider__item">
    <CustomImage :src="item?.filename" :alt="item?.alt" />
  </div>
</template>

<style lang="scss" scoped>
.scrolling-slider__item {
  flex-shrink: 0;
  width: vw(497);
  height: 100%;
  margin-right: vw(20);
  user-select: none;
  pointer-events: none;

  @media (max-width: $br1) {
    width: size(497, 343);
    margin-right: 16px;
  }

  @media (max-width: $br4) {
    width: 343px;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
