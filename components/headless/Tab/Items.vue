<template>
  <component :is="as" data-tabs-items>
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
interface IProps {
  as?: string
}

withDefaults(defineProps<IProps>(), {
  as: 'div',
})
</script>
