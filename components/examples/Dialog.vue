<script lang="ts" setup>
const isModalOpen = ref(false)

const openModal = (value: boolean) => {
  isModalOpen.value = value
}
</script>

<template>
  <div>
    <HeadlessButton @click="openModal(true)">Open</HeadlessButton>
    <Teleport to="#teleports">
      <HeadlessDialogModal
        class="dialog"
        :is-open="isModalOpen"
        :duration="0.3"
        @close="openModal(false)"
      >
        <HeadlessDialogBackdrop
          class="dialog-backdrop"
          @click="openModal(false)"
        ></HeadlessDialogBackdrop>
        <HeadlessDialogWindow class="dialog-window">
          <h3>Dialog title</h3>
          <p>Dialog content</p>
          <HeadlessButton @click="openModal(false)">Close</HeadlessButton>
        </HeadlessDialogWindow>
      </HeadlessDialogModal>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.dialog {
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 50;
}

.dialog-backdrop {
  inset: 0;
  background-color: rgba(
    33,
    33,
    33,
    0.6
  ); // Darker backdrop for a Material look
  position: fixed;
  z-index: 1;
  backdrop-filter: blur(3px); // Adds subtle blur effect for a modern touch
}

.dialog-window {
  position: relative;
  width: 90%;
  max-width: 600px;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow:
    0px 4px 12px rgba(0, 0, 0, 0.1),
    0px 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: 80vh;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(50px);
  z-index: 2;

  &.is-open {
    opacity: 1;
    transform: translateY(0);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    color: #333;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 1rem;
    color: #666;
    margin: 0 0 16px 0;
  }

  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;

    button {
      padding: 8px 16px;
      font-size: 0.875rem;
      font-weight: 500;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.04); // Subtle hover effect
      }

      &.close-btn {
        background-color: #f5f5f5;
        color: #333;
      }

      &.confirm-btn {
        background-color: #1976d2;
        color: #fff;
      }
    }
  }
}
</style>
