<script lang="ts" setup>
import { delayPromise } from '@emotionagency/utils'
import imagesLoaded from 'imagesloaded'
import { gsap } from '~/libs/gsap'

const { appear } = useLogoAnimation()

const { isInEditor, isUseLoader } = useAppState()

const isLoading = ref(true)

const loadingAnimation = async () => {
  await delayPromise(200)
  isLoading.value = false
  const $image = document.querySelector('[data-preload]') as HTMLElement
  const $title = document.querySelector('[data-title]') as HTMLElement

  const $logo = document.querySelector('.header__logo') as HTMLElement

  const logoBounds = $logo.getBoundingClientRect()

  const screenCenterX = window.innerWidth / 2
  const screenCenterY = window.innerHeight / 2
  const logoCenterX = logoBounds.left + logoBounds.width / 2
  const logoCenterY = logoBounds.top + logoBounds.height / 2
  const offsetX = screenCenterX - logoCenterX
  const offsetY = screenCenterY - logoCenterY

  let titleSplitter = null
  let $lines = null
  if ($title) {
    titleSplitter = new TextSplitter($title, {
      splitTypeTypes: 'lines,words',
    })
    $lines = titleSplitter?.getLines()
    gsap.set($lines, { y: '100%', clipPath: 'inset(0 0 110% 0)' })
  }

  const imageBounds = $image?.getBoundingClientRect()

  const tl = gsap.timeline()
  tl.set($image, { width: '100vw', height: '100vh' })

  tl.set($logo, {
    x: offsetX,
    y: offsetY,
    scale: 3,
  })

  appear()

  tl.to(
    $logo,
    {
      duration: 1,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      ease: 'power2.out',
    },
    1.7
  )

  $image &&
    tl.to(
      $image,
      {
        duration: 2,
        width: imageBounds?.width,
        height: imageBounds?.height,
        ease: 'power2.out',
      },
      1.7
    )

  $lines &&
    tl.to(
      $lines,
      {
        duration: 2,
        y: '0%',
        clipPath: 'inset(0 0 -110% 0)',
        stagger: 0.1,
        opacity: 1,
        ease: 'power2.out',
        overwrite: true,
        onComplete: () => {
          titleSplitter.revert()
          tl.revert()
        },
      },
      1.7
    )
}

onMounted(async () => {
  await nextTick()

  if (isInEditor.value || !isUseLoader.value) {
    isLoading.value = false
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
    <Preloader v-if="isLoading" />
  </Transition>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
