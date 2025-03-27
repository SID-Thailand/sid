<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const tooltipTrigger = ref<HTMLElement | null>(null)
const tooltipContent = ref<HTMLElement | null>(null)
const isVisible = ref(false)

interface IProps {
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
  transition?: string
  as?: string
}

const props = withDefaults(defineProps<IProps>(), {
  position: 'auto',
  transition: 'fade',
  as: 'div',
})

function showTooltip() {
  isVisible.value = true
}

function hideTooltip() {
  isVisible.value = false
}

// Handle keyboard interactions
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    hideTooltip()
  }
}

const computedPosition = computed(() => {
  if (!tooltipTrigger.value || !tooltipContent.value) return {}

  const triggerRect = tooltipTrigger.value.getBoundingClientRect()
  const tooltipRect = tooltipContent.value.getBoundingClientRect()
  const offset = 8

  switch (props.position) {
    case 'top':
      return {
        left: `${triggerRect.left + (triggerRect.width - tooltipRect.width) / 2}px`,
        top: `${triggerRect.top - tooltipRect.height - offset}px`,
      }
    case 'bottom':
      return {
        left: `${triggerRect.left + (triggerRect.width - tooltipRect.width) / 2}px`,
        top: `${triggerRect.bottom + offset}px`,
      }
    case 'left':
      return {
        left: `${triggerRect.left - tooltipRect.width - offset}px`,
        top: `${triggerRect.top + (triggerRect.height - tooltipRect.height) / 2}px`,
      }
    case 'right':
      return {
        left: `${triggerRect.right + offset}px`,
        top: `${triggerRect.top + (triggerRect.height - tooltipRect.height) / 2}px`,
      }
    case 'auto':
      if (triggerRect.top - tooltipRect.height > 0) {
        return {
          left: `${triggerRect.left + (triggerRect.width - tooltipRect.width) / 2}px`,
          top: `${triggerRect.top - tooltipRect.height - offset}px`,
        }
      }
      if (window.innerHeight - triggerRect.bottom - tooltipRect.height > 0) {
        return {
          left: `${triggerRect.left + (triggerRect.width - tooltipRect.width) / 2}px`,
          top: `${triggerRect.bottom + offset}px`,
        }
      }
      if (triggerRect.left - tooltipRect.width > 0) {
        return {
          left: `${triggerRect.left - tooltipRect.width - offset}px`,
          top: `${triggerRect.top + (triggerRect.height - tooltipRect.height) / 2}px`,
        }
      }
      return {
        left: `${triggerRect.right + offset}px`,
        top: `${triggerRect.top + (triggerRect.height - tooltipRect.height) / 2}px`,
      }
    default:
      return {}
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <component :is="as" data-tooltip>
    <div
      ref="tooltipTrigger"
      data-tooltip-trigger
      tabindex="0"
      aria-describedby="tooltip"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      @focus="showTooltip"
      @blur="hideTooltip"
      @keydown="handleKeydown"
    >
      <slot name="trigger" />
    </div>
    <transition :name="transition">
      <Teleport to="#teleports">
        <div
          v-if="isVisible"
          ref="tooltipContent"
          data-tooltip-content
          role="tooltip"
          :style="computedPosition"
        >
          <slot />
        </div>
      </Teleport>
    </transition>
  </component>
</template>

<style scoped lang="scss">
[data-tooltip] {
  position: relative;
}
[data-tooltip-trigger] {
  display: inline-block;
  cursor: pointer;
}

[data-tooltip-content] {
  position: fixed;
}
</style>
