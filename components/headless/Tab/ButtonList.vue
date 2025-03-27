<script lang="ts" setup>
interface IProps {
  as?: string
}

withDefaults(defineProps<IProps>(), {
  as: 'div',
})
</script>

<template>
  <component :is="as" data-tabs-button-list>
    <slot />
  </component>
</template>
