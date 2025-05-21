<script setup lang="ts">
import type { ReservedProps, VideoHTMLAttributes } from 'vue'

interface IProps {
  url: string
  videoAttributes?: VideoHTMLAttributes & ReservedProps
  isPlaying?: boolean
  isFullscreen?: boolean
}

const props = defineProps<IProps>()

const videoRef = ref<HTMLVideoElement | null>(null)
const emit = defineEmits(['fullscreen'])

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

const { isFullscreen: fullScreen, enter, exit } = useFullscreen(videoRef)

watch(
  () => props.isFullscreen,
  newVal => {
    if (!videoRef.value) return
    newVal ? enter() : exit()
  }
)

watch(fullScreen, newVal => {
  emit('fullscreen', newVal)
})
</script>

<template>
  <div class="video">
    <video
      ref="videoRef"
      :autoplay="isPlaying"
      loop
      muted
      preload="metadata"
      v-bind="videoAttributes"
      playsinline
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
    width: 100%;
    height: 100%;
  }
}
</style>
