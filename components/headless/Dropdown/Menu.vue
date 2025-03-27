<script setup lang="ts">
import type { MaybeElement, MaybeElementRef } from '@vueuse/core'

interface IProps {
  trigger?: 'click' | 'hover'
  as?: string
}

const props = withDefaults(defineProps<IProps>(), {
  trigger: 'click',
  as: 'div',
})

const isOpen = ref(false)
const activeIndex = ref(-1)
const menuItems = ref<HTMLElement[]>([])
const $menuRef: MaybeElementRef<MaybeElement> = ref(null)
const $triggerRef = ref<HTMLElement | null>(null)
const $wrapperRef = ref<HTMLElement | null>(null)

const id = useId()

function toggleDropdown(value?: boolean) {
  if (value === undefined) {
    isOpen.value = !isOpen.value
  } else {
    isOpen.value = value
  }
}

function closeDropdown() {
  isOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % menuItems.value.length
    menuItems.value[activeIndex.value]?.focus()
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value =
      (activeIndex.value - 1 + menuItems.value.length) % menuItems.value.length
    menuItems.value[activeIndex.value]?.focus()
  } else if (event.key === 'Escape') {
    closeDropdown()
  }
}

const registerTrigger = (trigger: HTMLElement) => {
  $triggerRef.value = trigger
}

provide('isOpen', isOpen)
provide('toggleDropdown', toggleDropdown)
provide('closeDropdown', closeDropdown)

provide('registerItem', (item: HTMLElement) => {
  menuItems.value.push(item)
})

provide('registerWrapper', (item: HTMLElement) => {
  $wrapperRef.value = item
})

provide('trigger', props.trigger)
provide('triggerEl', $triggerRef)

provide('registerTrigger', registerTrigger)
provide('id', id)

onClickOutside($menuRef, closeDropdown)

const onMouseMove = e => {
  if (props.trigger !== 'hover') return

  const isShowDropdown =
    e.target === $triggerRef.value ||
    $triggerRef.value?.contains(e.target) ||
    ($menuRef.value as HTMLElement)?.contains(e.target) ||
    menuItems.value.some(item => item.contains(e.target)) ||
    $wrapperRef.value?.contains(e.target) ||
    $wrapperRef.value === e.target

  toggleDropdown(isShowDropdown)
}

onMounted(() => {
  document.body.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
  document.body.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <component
    :is="as"
    ref="$menuRef"
    :data-dropdown-menu="id"
    @keydown="handleKeydown"
  >
    <slot :is-open="isOpen" />
  </component>
</template>

<style scoped>
[data-dropdown-menu] {
  display: inline-block;
  position: relative;
}
</style>
