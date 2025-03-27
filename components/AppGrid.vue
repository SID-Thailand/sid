<script lang="ts" setup>
const isVisible = ref(false)

const toggleView = e => {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  if (e.keyCode === 103 || e.keyCode === 1087) {
    isVisible.value = !isVisible.value
  }
}

onMounted(() => {
  document.addEventListener('keypress', toggleView)
})

onBeforeUnmount(() => {
  document.removeEventListener('keypress', toggleView)
})
</script>

<template>
  <div
    class="app-grid container grid"
    :class="{ 'app-grid--visible': isVisible }"
  >
    <div v-for="n in 12" :key="n" class="app-grid__col"></div>
  </div>
</template>

<style lang="scss" scoped>
.app-grid {
  position: fixed;
  @include coverdiv(fixed);
  z-index: 10000;
  pointer-events: none;
  display: none;
}
.app-grid--visible {
  display: grid;
}
.app-grid__col {
  height: 100%;
  background-color: rgba(#b8b8b8, 0.1);
  @media (max-width: $br4) {
    &:nth-child(n + 5) {
      display: none;
    }
  }
}
</style>
