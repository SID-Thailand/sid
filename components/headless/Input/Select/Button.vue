<script lang="ts" setup>
const toggleDropdown = inject('toggleDropdown') as (arg0?: boolean) => void
</script>

<template>
  <div role="button" data-placeholder @click="() => toggleDropdown()">
    <slot />
  </div>
</template>
