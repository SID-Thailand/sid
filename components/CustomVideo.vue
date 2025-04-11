<script setup lang="ts">
import type { ReservedProps, VideoHTMLAttributes } from 'vue'

interface IProps {
  url: string
  videoAttributes?: VideoHTMLAttributes & ReservedProps
  isPlaying?: boolean
}

const props = defineProps<IProps>()

const videoRef = ref<HTMLVideoElement | null>(null)

watch(
  () => props.isPlaying,
  newVal => {
    if (videoRef.value) {
      if (newVal) {
        videoRef.value.play()
      } else {
        videoRef.value.pause()
      }
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="video">
    <video
      ref="videoRef"
      :autoplay="isPlaying"
      lazy
      loop
      muted
      playsinline="true"
      preload="metadata"
      v-bind="videoAttributes"
    >
      <source :src="url" type="video/mp4" />
    </video>
  </div>
</template>

<style scoped lang="scss">
.video {
  video {
    display: block;
    max-width: 100%;
    object-fit: cover;
    width: 100%;
    height: 100%;

    @media (max-width: $br3) {
      aspect-ratio: 1;
    }
  }
}
</style>
