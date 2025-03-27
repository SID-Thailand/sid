<script setup lang="ts">
import { createFocusTrap, type FocusTrap } from 'focus-trap'

interface IProps {
  isOpen: boolean
  duration?: number
}

const props = withDefaults(defineProps<IProps>(), {
  duration: 0.3,
})

const emit = defineEmits(['close'])

const dialogId = `dialog-${useId()}`
const $el = ref<HTMLElement | null>(null)

const $window = ref<HTMLElement | null>(null)
const trap = ref<FocusTrap | null>(null)
const $modalFocusGuard = ref<HTMLElement | null>(null)

const registerWindow = ($el: Ref<HTMLElement>) => {
  if (!$el.value) {
    throw new Error('Dialog window not found')
  }
  $window.value = $el.value
}

provide('registerWindow', registerWindow)
provide('dialogId', dialogId)

onMounted(() => {})

watch(
  () => props.isOpen,
  value => {
    if (!import.meta.client) {
      return
    }

    if (value) {
      setTimeout(() => {
        trap.value = createFocusTrap($el.value as HTMLElement)
        trap.value?.activate()
      }, 0)
    } else {
      trap.value?.deactivate()
    }
  }
)

watch(
  () => props.isOpen,
  () => {
    setTimeout(() => {
      $window.value?.classList.toggle('is-open', props.isOpen)
    }, 1)
  }
)
</script>

<template>
  <div
    v-if="isOpen"
    ref="$el"
    :data-open="isOpen"
    role="dialog"
    :aria-modal="true"
    :aria-labelledby="dialogId"
    v-bind="$attrs"
    @keydown.esc="emit('close')"
  >
    <button
      ref="$modalFocusGuard"
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 1px;
        opacity: 0;
      "
    ></button>

    <slot />
  </div>
</template>
