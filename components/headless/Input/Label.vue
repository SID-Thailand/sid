<script lang="ts" setup>
interface IProps {
  for?: string
}

const props = defineProps<IProps>()
</script>

<template>
  <label :for="props.for" data-label>
    <slot />
  </label>
</template>
