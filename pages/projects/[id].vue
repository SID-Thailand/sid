<script lang="ts" setup>
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { params } = useRoute()
</script>

<template>
  <section>Current Project {{ params.id }}</section>
</template>

<style scoped lang="scss"></style>
