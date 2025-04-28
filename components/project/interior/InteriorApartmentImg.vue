<script lang="ts" setup>
import type { iImage } from '~/types/story'

defineProps<{
  img: iImage
  idx: number
}>()

const $el = ref<HTMLSpanElement>()

const getVw = (vw: number) => {
  const vwValue = (vw / window.innerWidth) * 100
  return vwValue + 'vw'
}

const scaleImageByWidthAndHeight = (img: HTMLImageElement) => {
  const imgWidth = img.naturalWidth
  const imgHeight = img.naturalHeight

  if (imgWidth > imgHeight) {
    img.setAttribute('aspect', 'landscape')

    img.style.width = '33%'
    img.style.height = 'auto'
    img.setAttribute('original-height', getVw(img.offsetHeight + 32))
  } else {
    img.setAttribute('aspect', 'portrait')

    img.style.width = 'auto'
    img.style.height = '25vh'
    img.setAttribute('original-height', getVw(img.offsetHeight + 32))
  }
}

const onResize = () => {
  const img = $el.value?.querySelector('img') as HTMLImageElement
  if (img) {
    scaleImageByWidthAndHeight(img)
  }
}

onMounted(async () => {
  await nextTick()

  onResize()
})
</script>

<template>
  <li ref="$el" class="interior-apart__img-item" data-image-wrapper>
    <CustomImage
      data-image
      :src="img?.filename"
      :alt="img?.alt"
      class="iterior-apart__img"
    />
  </li>
</template>

<style scoped lang="scss">
.interior-apart__img-item {
  max-width: 100%;
  transform-origin: left top;

  &:not(:first-child) {
    .iterior-apart__img {
      margin-top: 32px;
    }
  }
}

.iterior-apart__img {
  --offset: 0;
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 90vh;
}
</style>
