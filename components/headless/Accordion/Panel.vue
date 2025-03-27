<script lang="ts" setup>
import { resize } from '@emotionagency/utils'
import type { MaybeElement } from '@vueuse/core'

interface IProps {
  as?: string
  transitionDuration?: number
}

withDefaults(defineProps<IProps>(), {
  as: 'div',
  transitionDuration: 300,
})

const registerPanel = inject('registerPanel') as (el: MaybeElement) => void

const $el: MaybeRef<HTMLElement> = ref(null)

const idx = ref(null)
const height = ref(0)

const calcHeight = () => {
  nextTick(() => {
    height.value = $el.value.scrollHeight
  })

  return height.value
}

onMounted(() => {
  idx.value = registerPanel($el.value)

  calcHeight()

  resize.on(calcHeight)
})

const togglePanel = inject('togglePanel') as (index: number) => void

const isOpened = inject('isOpened') as (index: number) => boolean

onBeforeUnmount(() => {
  resize.off(calcHeight)
})
</script>

<template>
  <transition name="panel">
    <component
      :is="as"
      v-show="isOpened(idx)"
      ref="$el"
      data-panel
      role="region"
      :style="`--max-height: ${isOpened(idx) ? calcHeight() + 'px' : 0}; transition-duration: ${transitionDuration}ms`"
      @click="togglePanel(idx)"
    >
      <slot />
    </component>
  </transition>
</template>

<style scoped lang="scss">
.panel-enter-active,
.panel-leave-active {
  transition: max-height ease;
}

.panel-enter-from {
  max-height: 0px !important;
}

.panel-enter,
.panel-leave-to {
  max-height: 0px !important;
}

[data-panel] {
  max-height: var(--max-height);

  overflow: hidden;
}
</style>
