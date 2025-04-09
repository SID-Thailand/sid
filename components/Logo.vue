<script lang="ts" setup>
const elRef = ref<SVGElement | null>(null)

const { init } = useLogoAnimation()

onMounted(() => {
  init(elRef.value as SVGElement | null)
})

const logoPaths = [
  {
    d: 'M5.33868 19.027L5.06665 18.8716V45.0727L5.33868 45.228V19.027Z',
  },
  {
    d: 'M31.7657 31.3892L32.0377 31.5446V5.47833L31.7657 5.63371V31.3892Z',
  },
  {
    d: 'M5.06665 18.3714L30.4774 32.8838V59.9417L5.06665 45.4292V47.2624L32.0377 62.6667V31.9416L6.84515 17.554L32.0377 3.16647V1.33333L5.06665 16.7367V18.3714Z',
  },
  {
    d: 'M35.2033 7.0501L33.6429 6.15913V57.8714L35.2033 56.9804V7.0501Z',
  },
  {
    d: 'M35.6925 30.0977L56.8253 18.0292V17.7211L35.6925 29.7905V30.0977Z',
  },
  {
    d: 'M35.6925 34.2634L56.8253 46.3328V46.0256L35.6925 33.9562V34.2634Z',
  },
  {
    d: 'M29.9925 33.0455L7.00046 46.1774L7.2698 46.331L29.9925 33.3526V33.0455Z',
  },
  {
    d: 'M33.6429 2.29436V4.1266L57.373 17.6798V46.3489L33.6429 59.9012L33.6294 61.7425L58.9333 47.2839V16.7376L33.6429 2.29436Z',
  },
]
</script>

<template>
  <svg
    ref="elRef"
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      v-for="path in logoPaths"
      :key="path.d"
      :d="path.d"
      stroke-width="1"
      fill="currentColor"
    />
  </svg>
</template>

<style lang="scss" scoped></style>
