<script setup lang="ts">
import type { IEventArgs } from '@emotionagency/emotion-scroll'
import { LucidePlus } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  window.escroll.on((e: IEventArgs) => {
    isVisible.value = e.direction === -1
  })
})
</script>

<template>
  <Button
    type="button"
    class="project-w-btn"
    :class="{
      'project-w-btn--visible': isVisible,
    }"
  >
    <span>WHATSAPP</span>
    <LucidePlus />
  </Button>
</template>

<style scoped lang="scss">
.project-w-btn {
  position: fixed !important;
  bottom: vw(85);
  left: 50%;
  transform: translate(-50%, 10px);
  opacity: 0;
  visibility: hidden;
  transition: 0.3s ease-in-out;
  transition-property: opacity, transform, visibility;
  &--visible {
    opacity: 1;
    transform: translate(-50%, 0);
    visibility: visible;
  }

  @media (max-width: $br1) {
    bottom: 48px;
  }
}
</style>
