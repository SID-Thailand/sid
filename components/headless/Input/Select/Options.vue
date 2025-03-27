<script lang="ts" setup>
const isOpen = inject('isOpen') as any
</script>

<template>
  <div v-show="isOpen" data-listbox role="listbox">
    <slot></slot>
  </div>
</template>
