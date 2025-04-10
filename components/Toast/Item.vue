<script setup lang="ts">
import { gsap } from '~/libs/gsap'
import type { iToast } from '~/composables/toast'

interface iProps {
  toast: iToast
}

const props = defineProps<iProps>()
const emit = defineEmits(['close'])

const $progress = ref(null)

const onClose = (id: string) => {
  emit('close', id)
}

onMounted(() => {
  setTimeout(() => {
    gsap.to($progress.value, {
      duration: 5,
      width: '100%',
      ease: 'linear',
      onComplete: () => {
        onClose(props.toast.id)
      },
    })
  }, 0)
})
</script>

<template>
  <div class="toast" :class="`toast--${toast.color}`">
    <div ref="$progress" class="toast__progress" />
    <p class="toast__text">
      {{ toast.text }}
    </p>
    <button class="toast__close-btn" @click.prevent="onClose(toast.id)">
      <span class="toast__close-line" />
      <span class="toast__close-line" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.toast {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  column-gap: 12px;
  color: var(--white);
  padding: 16px;
  width: fit-content;
  border-radius: 10px;

  &--info {
    background-color: var(--status-info);
  }

  &--success {
    background-color: var(--status-success);
  }

  &--danger {
    background-color: var(--status-danger);
  }

  &--warning {
    background-color: var(--status-warning);
  }

  + .toast {
    margin-top: 10px;
  }
}

.toast__progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--white);
}

.toast__icon {
  display: block;
  width: 16px;
  height: 16px;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.toast__close-btn {
  position: relative;
  width: 16px;
  height: 16px;
  display: block;
  background-color: transparent;
}

.toast__close-line {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--white);

  &:first-child {
    transform: rotate(45deg);
  }

  &:last-child {
    transform: rotate(-45deg);
  }
}
</style>
