<script setup lang="ts">
const elRef = ref<SVGElement | null>(null)

const { init } = useLogoAnimation()

onMounted(() => {
  init(elRef.value as SVGElement | null)
})
</script>

<template>
  <div ref="elRef">
    <Logo class="header__logo" />
  </div>
</template>

<style scoped lang="scss">
.header__logo {
  display: block;
  width: vw(64);
  height: auto;

  @media (max-width: $br1) {
    width: 40px;
  }
}
</style>
