<script setup lang="ts">
import Tooltip from '~/components/headless/Tooltip/Tooltip.vue'
</script>

<template>
  <main
    style="
      max-width: 500px;
      display: flex;
      flex-direction: column;
      gap: 40px;
      margin: 0 auto;
    "
  >
    <h1 class="main_title">Hello from Emotion!</h1>

    <!-- <ExamplesDialog />
    <ExamplesTabs />
    <ExamplesField />
    <ExamplesPasswordField />
    <HeadlessInputNumber
      id="number"
      style="min-width: 300px"
      :min="1"
      :max="10"
      placeholder="Number"
      class="input"
    />
    <ExamplesTextarea :rows="10" />
    <ExamplesCheckbox />
    <ExamplesSelect />
    <ExamplesDropdown />

    <Tooltip position="right">
      <template #trigger>
        <button>Hover or focus m</button>
      </template>
      Tooltip content
    </Tooltip>

    <ExamplesAccordion /> -->
  </main>
</template>

<style scoped lang="scss">
.main_title {
  @include med;
}
</style>
