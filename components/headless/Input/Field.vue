<script lang="ts" setup>
import { provideInputContext } from '~/composables/headless/inputContext'

interface IProps {
  as?: string
}

withDefaults(defineProps<IProps>(), {
  as: 'div',
})

const inputCtx = provideInputContext()
</script>

<template>
  <component :is="as" data-field :disabled="inputCtx.disabled">
    <slot v-bind="inputCtx" />
  </component>
</template>
