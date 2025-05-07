<script lang="ts" setup>
import type { iImage } from '~/types/story'

defineProps<{
  img: iImage
  idx: number
}>()

const emit = defineEmits(['open'])
</script>

<template>
  <li class="interior-apart__img-item">
    <CustomImage
      :src="img?.filename"
      :alt="img?.alt"
      class="interior-apart__img"
      @click="emit('open')"
    />
  </li>
</template>

<style scoped lang="scss">
.interior-apart__img-item {
  @media (min-width: $br1) {
    &:not(:first-child) {
      .interior-apart__img {
        margin-top: 32px;
      }
    }
  }

  @media (max-width: $br1) {
    height: 332px;
    width: 332px;
  }
}

.interior-apart__img {
  display: block;
  width: 100%;
  // height: vw(600);
  cursor: pointer;

  @media (max-width: $br1) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
