<script lang="ts" setup>
import imagesLoaded from 'imagesloaded'

const { isInEditor, isUseLoader } = useAppState()

const { isFirstLoad, init } = useLoadingAnimation()

const loadingAnimation = async () => {
  window.escroll.disabled = true
  await init()
}

onMounted(async () => {
  await nextTick()

  if (isInEditor.value || !isUseLoader.value) {
    isFirstLoad.value = false
    return
  }

  const preloaderImage = document.querySelector('[data-preload]')

  if (preloaderImage) {
    imagesLoaded(preloaderImage, loadingAnimation)
  } else {
    loadingAnimation()
  }
})

onErrorCaptured(error => {
  console.error('Error in app.vue:', error)
  return false
})
</script>

<template>
  <Transition name="loader">
    <Preloader v-if="isFirstLoad" />
  </Transition>
  <NuxtLayout>
    <FormModal />

    <NuxtPage />
  </NuxtLayout>
</template>
