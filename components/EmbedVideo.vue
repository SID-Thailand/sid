<script lang="ts" setup>
import type { IframeHTMLAttributes, ReservedProps } from 'vue'

interface IProps {
  url?: string
  width: number | string
  height: number | string

  videoAttributes?: IframeHTMLAttributes & ReservedProps
  isFullscreen?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  width: 1920,
  height: 1080,
})
const emit = defineEmits(['exitFullscreen'])

const $iframe = useTemplateRef('iframe')
const $el = useTemplateRef('el')
const aspect = computed(() => +props.width / +props.height)
const embedUrl = ref('')

// Watch for fullscreen change
watch(
  () => props.isFullscreen,
  newVal => {
    if ($iframe.value) {
      if (newVal) {
        $el.value.requestFullscreen()
      } else {
        document.exitFullscreen()
        emit('exitFullscreen')
      }
    }
  }
)

const fullScreenHandler = () => {
  if (!document.fullscreenElement) {
    emit('exitFullscreen')
  }
}

// Determine platform and extract ID
const getEmbedUrl = (url?: string): string => {
  if (!url) return ''

  try {
    const parsed = new URL(url)

    // YouTube
    if (
      parsed.hostname.includes('youtube.com') ||
      parsed.hostname.includes('youtu.be')
    ) {
      const videoId = parsed.hostname.includes('youtu.be')
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get('v')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
    }

    // Vimeo
    if (parsed.hostname.includes('vimeo.com')) {
      const videoId = parsed.pathname.split('/').filter(Boolean).pop()
      return videoId ? `https://player.vimeo.com/video/${videoId}` : ''
    }
  } catch (e) {
    console.warn('Invalid video URL:', url, e)
  }

  return ''
}

onMounted(() => {
  document.addEventListener('fullscreenchange', fullScreenHandler)

  embedUrl.value = getEmbedUrl(props.url)
})

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', fullScreenHandler)
})

const embedUrlWithParams = computed(() => {
  if (!embedUrl.value) return ''
  const params = new URLSearchParams({
    autoplay: '1',
    mute: props.isFullscreen ? '0' : '1',
    loop: '1',
    rel: '0',
    controls: '0',
    background: props.isFullscreen ? '0' : '1',
  })
  return `${embedUrl.value}?${params.toString()}`
})
</script>

<template>
  <div ref="el" class="embed-video" :style="{ '--aspect': aspect }">
    <iframe
      v-if="embedUrl"
      ref="iframe"
      :src="embedUrlWithParams"
      :style="{ pointerEvents: isFullscreen ? 'auto' : 'none' }"
      title="Video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</template>

<style scoped lang="scss">
.embed-video {
  width: 100%;
  aspect-ratio: var(--aspect);
  iframe {
    display: block;
    max-width: 100%;
    pointer-events: none;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
}
</style>
