<script setup lang="ts">
import { useFonts } from '~/composables/fonts'

useFonts()

onMounted(async () => {
  const { detectOrientationChanges } = await import(
    '~/utils/detectLandscapeOrientation'
  )

  detectOrientationChanges()
})

useHead({
  htmlAttrs: {
    lang: 'en',
    translate: 'no',
  },
})
</script>

<template>
  <div id="app">
    <AppGrid />
    <!-- <Landscape /> -->
    <SmoothScroll>
      <div class="app">
        <AppHeader />
        <main class="main-content">
          <slot />
        </main>
        <Revealer />

        <AppFooter />
      </div>
    </SmoothScroll>
    <ToastGroup />
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
