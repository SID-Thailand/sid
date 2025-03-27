<script setup lang="ts">
const toggleDropdown = inject('toggleDropdown') as (value?: boolean) => void

const registerTrigger = inject('registerTrigger') as (
  trigger: HTMLElement
) => void

const trigger = inject('trigger') as 'click' | 'hover'

const $triggerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!$triggerRef.value) return

  registerTrigger($triggerRef.value as HTMLElement)
})

const id = inject('id') as string
</script>

<template>
  <button
    ref="$triggerRef"
    :data-dropdown-trigger="id"
    @click="trigger === 'click' && toggleDropdown()"
    @keydown.space.prevent="toggleDropdown()"
    @keydown.enter.prevent="toggleDropdown()"
  >
    <slot />
  </button>
</template>
