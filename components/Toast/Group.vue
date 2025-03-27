<script setup lang="ts">
const { toasts, updateToasts } = useToasts()

const hide = (id: string) => {
  const filteredToasts = toasts.value.filter(toast => toast.id !== id)
  updateToasts(filteredToasts)
}
</script>

<template>
  <div class="container toast-container">
    <TransitionGroup name="fade">
      <ToastItem
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast"
        @close="hide"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  z-index: 10000;
  top: 8%;
  width: fit-content;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
