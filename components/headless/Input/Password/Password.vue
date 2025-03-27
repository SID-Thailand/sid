<script lang="ts" setup>
import type { IInput } from '~/types/headless/input'

interface IProps extends IInput {
  isPasswordVisible: boolean
}

const props = defineProps<IProps>()
</script>

<template>
  <HeadlessInput
    v-bind="props"
    :type="isPasswordVisible ? 'text' : 'password'"
  />
</template>
