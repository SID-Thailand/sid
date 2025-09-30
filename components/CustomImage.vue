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
  quality: 70,
  width: 0,
  height: 0,
  preload: false,
})

const imgRef = ref<HTMLImageElement | null>(null)

defineExpose({ imgRef })

const loaded = ref(false)

const attrs = computed(() => {
  const obj: any = {
    src: props.src,
    alt: props.alt,
    placeholder: true,
    quality: props.quality,
    preload: props.preload,
    format: 'webp',
    provider: 'storyblok',
    loading: props.preload ? 'eager' : undefined,
    densities: '1x',
    sizes: `sm:100vw md:${props.width || 1920}px`,
    onLoad: () => {
      loaded.value = true
    },
  }

  if (props.width) {
    obj.width = props.width
  }

  if (props.height) {
    obj.height = props.height
  }

  return obj
})
</script>

<template>
  <NuxtImg
    ref="imgRef"
    class="custom-image"
    :class="{
      'custom-image--loading': !loaded,
      'custom-image--loaded': loaded,
    }"
    :img-attrs="imgAttributes"
    v-bind="attrs"
  />
</template>

<style lang="scss" scoped>
.custom-image {
  background-color: var(--neutral-200);
  transition: background-color 0.6s ease-in-out;
  will-change: background-color;
  // &--loading {
  // }
  &--loaded {
    background-color: transparent;
  }
}
</style>
