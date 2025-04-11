<script setup lang="ts">
import type { ImgHTMLAttributes, ReservedProps } from 'vue'

interface iProps {
  src: string
  alt?: string
  quality?: number
  width?: number
  height?: number
  imgAttributes?: ImgHTMLAttributes & ReservedProps
  preload?: boolean
}

const props = withDefaults(defineProps<iProps>(), {
  alt: '',
  quality: 82,
  width: 0,
  height: 0,
  isWebgl: false,
  preload: false,
})

const imgRef = ref<HTMLImageElement | null>(null)

defineExpose({ imgRef })

const currentSrc = computed(() => {
  return useStoryblokImage(props.src, {
    format: 'webp',
    quality: props.quality,
    size: `${props.width}x${props.height}`,
  })
})

if (props.preload) {
  useHead({
    link: [
      {
        rel: 'preload',
        as: 'image',
        href: currentSrc.value,
      },
    ],
  })
}
</script>

<template>
  <img
    ref="imgRef"
    :src="currentSrc"
    :alt="alt"
    class="custom-image"
    v-bind="imgAttributes"
  />
</template>

<style scoped lang="scss"></style>
