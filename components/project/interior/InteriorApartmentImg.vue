<script lang="ts" setup>
import { gsap } from '~/libs/gsap'
import type { iImage } from '~/types/story'

const props = defineProps<{
  img: iImage
  idx: number
}>()

const $el = ref<HTMLSpanElement>()

onMounted(async () => {
  await nextTick()
  if (props.idx) {
    const img = $el.value.querySelector('img')

    const elWidth = img?.clientWidth

    gsap.set(img, {
      width: elWidth * 0.33,
    })
  }
})
</script>

<template>
  <li ref="$el" class="interior-apart__img-item">
    <CustomImage
      :src="img?.filename"
      :alt="img?.alt"
      class="iterior-apart__img"
    />
  </li>
</template>

<style scoped lang="scss">
.interior-apart__img-item {
  max-width: 100%;
}

.iterior-apart__img {
  height: fit-content;
  transform-origin: left top;

  // aspect-ratio: var(--aspect);
}
</style>
