<script setup lang="ts">
import type { iImage } from '~/types/story'
import { ScrollTrigger } from '~/libs/gsap'
import { LucideArrowUpRight } from 'lucide-vue-next'
import Play from './icons/Play.vue'
import type { iYoutubeButton } from '~/types/consultingTypes'

interface IProps {
  title: string
  asset: iImage
  addressText?: string
  button?: iYoutubeButton
  isYoutube?: boolean
}

defineProps<IProps>()

const isPlaying = ref(false)
const isClicked = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
const videoElements = ref<HTMLVideoElement[]>([])

const st = ref<ScrollTrigger>(null)

const togglePlay = () => {
  isPlaying.value = !isPlaying.value

  isClicked.value = true

  setTimeout(() => {
    isClicked.value = false
  }, 200)
}

onMounted(() => {
  if (!sectionRef.value) return

  const videos = sectionRef.value.querySelectorAll('video')
  videoElements.value = Array.from(videos)

  st.value = ScrollTrigger.create({
    trigger: sectionRef.value as HTMLElement,
    start: () => `top-=${window.innerHeight * 0.75} top`,
    end: () => `bottom+=${window.innerHeight * 0.75} bottom`,

    onUpdate: self => {
      const inView = self.isActive
      if (isClicked.value) {
        return
      }
      isPlaying.value = inView
    },
  })
})

onBeforeUnmount(() => {
  st.value?.kill()
})
</script>

<template>
  <section ref="sectionRef" class="d-video">
    <div class="d-video__wrapper">
      <h2 class="d-video__title">{{ title }}</h2>
      <div class="d-video__videos">
        <div class="d-video__landscape">
          <CustomVideo
            :video-attributes="{
              preload: 'true',
            }"
            :url="asset?.filename"
            :is-playing="isPlaying"
          />
        </div>
        <div class="d-video__phone">
          <div class="d-video__phone-wrapper">
            <div class="d-video__phone-camera" />
            <CustomVideo :url="asset?.filename" :is-playing="isPlaying" />
            <a
              v-if="isYoutube"
              :href="button?.link?.url"
              target="_blank"
              rel="noopener noreferrer"
              type="button"
              class="d-video__youtube"
            >
              <Play />
            </a>
            <button
              v-else
              type="button"
              class="d-video__phone-btn"
              :class="{ 'd-video__phone-btn--active': isClicked }"
              @click="togglePlay"
            >
              <span>PLAY</span>
            </button>
          </div>
        </div>
      </div>
      <Button
        v-if="button"
        tag="a"
        :href="button?.link?.url"
        type="button"
        class="d-video__btn"
      >
        {{ button?.label }}
        <span><LucideArrowUpRight /></span>
      </Button>
    </div>
    <div v-if="addressText" class="d-video__address">
      <BuildAddress :text="addressText" />
    </div>
  </section>
</template>

<style lang="scss">
.d-video {
  padding: vw(100) 0 vw(65);
  border-radius: vw(148) vw(148) 0 0;
  background-image: var(--gradient-primary);

  @media (max-width: $br1) {
    padding: 48px 16px 60px;
    border-radius: 40px 40px 0 0;
  }
}

.d-video__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: $br1) {
    padding: 0 vw(100);
  }
}

.d-video__title {
  font-size: vw(50);
  line-height: 1em;
  text-transform: uppercase;
  color: var(--neutral-200);
  text-align: center;
  max-width: vw(1135);
  @include med;

  @media (max-width: $br1) {
    font-size: size(50, 24);
    max-width: 100%;
  }

  @media (max-width: $br4) {
    font-size: 24px;
  }
}

.d-video__videos {
  position: relative;
  margin-top: vw(100);

  @media (max-width: $br1) {
    margin-top: 48px;
  }
}

.d-video__landscape {
  position: relative;
  display: flex;
  height: vw(580);
  width: vw(1135);
  border-radius: vw(40);
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: var(--gradient-quaternary);
  }

  .video {
    width: 100%;
    height: 100%;
  }

  @media (min-width: $br1) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: $br1) {
    display: none;
  }
}

.d-video__phone {
  position: relative;
  height: vw(822);

  aspect-ratio: 451 / 822;

  overflow: hidden;
  z-index: 2;

  .video {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  @media (min-width: $br1) {
    height: clamp(vw(700), vw(822), 100vh);
    aspect-ratio: 451 / 822;
  }

  @media (max-width: $br1) {
    height: 568px;
    width: 100%;
    max-width: 312px;
  }
}

.d-video__phone-wrapper {
  width: 100%;
  height: 100%;

  overflow: hidden;
  border-radius: vw(40);

  border: 12px solid var(--Gradient-Quaternary, rgba(0, 0, 0, 0.6));

  @media (max-width: $br1) {
    border-radius: 32px;
  }
}

.d-video__phone-camera {
  display: block;
  position: absolute;
  top: vw(30);
  left: 50%;
  transform: translateX(-50%);
  width: vw(16);
  height: vw(16);
  border-radius: 100%;
  background-color: var(--basic-black);

  @media (max-width: $br1) {
    width: 12px;
    height: 12px;
    top: 20px;
  }
}

.d-video__phone-btn {
  position: relative;
  width: vw(68);
  height: vw(68);
  border-radius: 100%;
  position: absolute;
  bottom: vw(50);
  left: 50%;
  transform: translateX(-50%) scale(1);
  color: var(--accent-secondary);
  border: 2px solid var(--basic-white);
  overflow: hidden;
  transition: transform 0.3s ease;
  @include caption-c4;

  span {
    position: relative;
    z-index: 2;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-image: var(--accent-primary);
    z-index: 1;
    transition: opacity 0.3s $easing;
  }

  @media (max-width: $br1) {
    width: size(68, 48);
    height: size(68, 48);
    bottom: 25px;
  }

  @media (max-width: $br4) {
    width: 48px;
    height: 48px;
  }

  &--active {
    transform: translateX(-50%) scale(0.8);
  }
}

.d-video__address {
  display: flex;
  justify-content: flex-end;
  margin-top: vw(100);
  width: 100%;
}

.d-video__btn {
  margin-top: vw(100);

  @media (max-width: $br1) {
    margin-top: 40px;
  }
}

.d-video__youtube {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #cf0a0a;
  width: vw(88);
  height: vw(60);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;

  svg {
    position: relative;
    display: block;
    width: vw(20);
    height: vw(20);
    left: vw(3);
  }

  @media (max-width: $br1) {
    width: 60px;
    height: 40px;
    border-radius: 12px;

    svg {
      width: 16px;
      height: 16px;
      left: 2px;
    }
  }
}
</style>
