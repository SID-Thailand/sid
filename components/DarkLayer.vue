<template>
  <div class="dark-layer" />
</template>

<style lang="scss" scoped>
.dark-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    180deg,
    #3a3838 0%,
    rgba(#202020, 0.5) 100%
  );
  mix-blend-mode: hard-light;
  z-index: 1;
}
</style>
