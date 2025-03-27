<script lang="ts" setup>
import type { MaybeElement } from '@vueuse/core'

interface IProps {
  as?: string
}

withDefaults(defineProps<IProps>(), {
  as: 'button',
})

const registerButton = inject('registerButton') as (
  button: MaybeElement
) => void

const $panels = inject('panels') as Ref<HTMLElement[]>

const $buttons = inject('buttons') as Ref<HTMLElement[]>

const $el: MaybeRef<MaybeElement> = ref(null)

const idx = ref(null)

onMounted(() => {
  idx.value = registerButton($el.value)
})

const togglePanel = inject('togglePanel') as (index: number) => void

function handleKeydown(event: KeyboardEvent, index: number) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    togglePanel(index)
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveFocus(index, 1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveFocus(index, -1)
  }
}

function moveFocus(currentIndex: number, step: number) {
  const nextIndex =
    (currentIndex + step + $panels.value.length) % $panels.value.length

  console.log(nextIndex, $buttons.value[nextIndex])

  $buttons.value[nextIndex]?.focus()
}

const isOpened = inject('isOpened') as (index: number) => boolean
</script>

<template>
  <component
    :is="as"
    ref="$el"
    :aria-expanded="isOpened(idx)"
    @click="togglePanel(idx)"
    @keydown="handleKeydown($event, idx)"
  >
    <slot />
  </component>
</template>
