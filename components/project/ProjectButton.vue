<script setup lang="ts">
import type { IEventArgs } from '@emotionagency/emotion-scroll'
import { delayPromise } from '@emotionagency/utils'
import { useMenuStory } from '~/composables/stories/menuStory'

const { story } = await useMenuStory()

const link = computed(() => {
  return story.value?.content?.socials?.find(s => s?.label === 'Whatsapp')
})

const isVisible = ref(false)
const isDisabled = ref(false)

const setupDesktopScroll = () => {
  window.escroll?.on?.(async (e: IEventArgs) => {
    !isVisible.value && (await delayPromise(500))

    isVisible.value = e.direction === -1
  })
}

const observer = ref<IntersectionObserver>(null)

onMounted(async () => {
  setupDesktopScroll()

  await delayPromise(500)
  observer.value = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      isDisabled.value = entry.isIntersecting
    })
  })

  const interior = document.querySelector('[data-interior-apparts]')

  observer.value.observe(interior)
})

onBeforeUnmount(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <Button
    v-if="link"
    :href="link?.link?.cached_url"
    tag="a"
    class="project-w-btn"
    :class="{
      'project-w-btn--visible': isVisible && !isDisabled,
    }"
  >
    <span>{{ link?.label }}</span>
    <IconsPlus />
  </Button>
</template>

<style scoped lang="scss">
.project-w-btn {
  position: fixed !important;
  bottom: vw(45);
  left: 50%;
  transform: translate(-50%, calc(100% + vw(48)));
  z-index: 10;
  transition: 1s cubic-bezier(0.15, 0.9, 0.34, 0.95);
  transition-property: transform;

  @media (max-width: $br1) {
    transform: translate(-50%, calc(100% + 30px));
    bottom: 28px;
  }

  &--visible {
    transform: translate(-50%, 0);
  }

  svg {
    display: block;
    width: vw(18);
    height: vw(18);

    @media (max-width: $br1) {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
