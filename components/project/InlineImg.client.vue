<script lang="ts" setup>
interface IProps {
  src: string
  alt: string
}

defineProps<IProps>()

const $el = ref<HTMLSpanElement>()

const aspectRatio = ref(1)

const computeAspectRatio = async () => {
  const img = $el.value.querySelector('img')

  const src = img?.src

  const { width, height } = await getImgSize(src)

  if (!width || !height) return

  aspectRatio.value = width / height
}

onMounted(async () => {
  await nextTick()

  computeAspectRatio()
})
</script>

<template>
  <span ref="$el" class="inline-img" :style="{ '--aspect': aspectRatio }">
    <ParallaxImg class="inline-img__img" :src="src" :alt="alt || ''" />
  </span>
</template>

<style lang="scss">
.inline-img {
  display: inline-block;

  aspect-ratio: var(--aspect);
}

.inline-img__img {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: block;
}
</style>
