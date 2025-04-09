<script setup lang="ts">
import { useFonts } from '~/composables/fonts'

useFonts()

onMounted(async () => {
  const { hello } = await import('~/utils/hello')
  const { detectOrientationChanges } = await import(
    '~/utils/detectLandscapeOrientation'
  )

  detectOrientationChanges()
  hello()
})

useHead({
  htmlAttrs: {
    lang: 'en',
    id: 'scroll-container',
  },
})
</script>

<template>
  <div id="app">
    <Head>
      <Title>SID</Title>
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></Meta>
      <Link rel="icon" type="image/x-icon" href="/favicon.ico"></Link>
    </Head>
    <AppGrid />
    <!-- <Landscape /> -->
    <SmoothScroll>
      <div class="app">
        <Header />
        <main class="main-content">
          <slot />
        </main>
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
