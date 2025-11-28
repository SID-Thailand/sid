<script lang="ts" setup>
import imagesLoaded from 'imagesloaded'

const { isInEditor, isUseLoader } = useAppState()

const { isFirstLoad, init } = useLoadingAnimation()

const config = useRuntimeConfig()

const loadingAnimation = async () => {
  window.escroll.disabled = true
  await init()
}

// Mails.Ru counter
if (config.public.MAIL_RU_ID && config.public.ENVIROMENT === 'production') {
  useHead({
    script: [
      {
        children: `var _tmr = window._tmr || (window._tmr = []);_tmr.push({id: "${config.public.MAIL_RU_ID}", type: "pageView", start: (new Date()).getTime()});(function (d, w, id) {if (d.getElementById(id)) return;var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;ts.src = "https://top-fwz1.mail.ru/js/code.js";var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }})(document, window, "tmr-code");`,
        type: 'text/javascript',
        tagPosition: 'head',
      },
    ],
    noscript: [
      {
        children: `<div><img src="https://top-fwz1.mail.ru/counter?id=${config.public.MAIL_RU_ID};js=na" style="position:absolute;left:-9999px;" alt="Top.Mails.Ru" /></div>`,
      },
    ],
  })
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
  <Head>
    <Meta name="viewport" content="width=device-width, initial-scale=1"></Meta>
    <Link rel="icon" type="image/x-icon" href="/favicon.ico"></Link>
  </Head>
  <GlobalMeta />
  <Transition name="loader">
    <Preloader v-if="isFirstLoad" />
  </Transition>
  <NuxtLayout>
    <FormModal />
    <ClientOnly>
      <ModalsApproveSlideModal />
    </ClientOnly>

    <NuxtPage />
  </NuxtLayout>
</template>
