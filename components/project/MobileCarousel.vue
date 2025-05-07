<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import type { iImage } from '~/types/story'

interface IProps {
  assets: iImage[]
}

defineProps<IProps>()

const emit = defineEmits(['choose'])

const dir = ref('down')

const $el = useTemplateRef('el')

useSwipe($el, {
  threshold: 20,
  onSwipe: () => {
    if (dir.value === 'left' || dir.value === 'right') {
      window.escroll.disabled = true
    }
  },
  onSwipeEnd: (_, direction) => {
    dir.value = direction
    window.escroll.disabled = false
  },
})

const chooseHandler = (e: MouseEvent, item: iImage, idx: number) => {
  emit('choose', e, item, idx)
}
</script>

<template>
  <div ref="el" class="pmc">
    <Swiper
      :slides-per-view="1.1"
      :space-between="16"
      :loop="true"
      :speed="1000"
      :prevent-interaction-on-transition="true"
      :threshold="20"
    >
      <SwiperSlide
        v-for="(item, idx) in assets"
        :key="idx"
        class="pmc__item"
        @click="chooseHandler($event, item, idx)"
      >
        <CustomImage :src="item?.filename" :alt="item?.alt" class="pmc__img" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss">
.pmc {
  --swiper-wrapper-transition-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
  @media (min-width: $br1) {
    display: none;
  }
}

.pmc__item {
  aspect-ratio: 1;
  user-select: none;
  @media (min-width: $br1) {
    display: none;
  }
}
.pmc__img {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
