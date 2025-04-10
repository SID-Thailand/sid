<script lang="ts" setup>
import { gsap } from '~/libs/gsap'

interface iProps {
  src: string
  scale?: number
  alt?: string
  width?: number
  height?: number
  storyblok?: boolean
  format?: 'webp' | 'jpg' | 'png' | null
  quality?: number
  imageAttrs?: Record<string, string>
}

defineProps<iProps>()

const imgWrapper = ref<HTMLDivElement | null>(null)
const imgContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!imgWrapper.value || !imgContainer.value) return

  if (window.innerWidth < 1060) {
    return
  }

  gsap.fromTo(
    imgContainer.value,
    { y: '-20%' },
    {
      y: '5%',
      ease: 'none',
      scrollTrigger: {
        trigger: imgWrapper.value as HTMLDivElement,

        start: () => 'top bottom',
        end: () => `bottom+=${window.innerHeight} bottom`,
        scrub: true,
      },
    }
  )
})
</script>

<template>
  <div ref="imgWrapper" class="p-img-wrapper">
    <div ref="imgContainer" class="p-img-container">
      <CustomImage
        v-bind="imageAttrs"
        class="parallax-img"
        :src="src"
        :alt="alt"
        :data-scale="scale"
        :quality="quality"
        :format="format"
        :width="width"
        :height="height"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.p-img-wrapper {
  position: relative;
  overflow: hidden;
  height: auto;
}
.p-img-container {
  width: 100%;
  height: 100%;
  transform-origin: center center;
  will-change: transform;
}
.parallax-img {
  width: 100%;
  height: 120%;
  object-fit: cover;
  display: block;
}
</style>
