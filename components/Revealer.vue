<template>
  <Teleport to="#teleports">
    <div class="revealer"></div>
  </Teleport>
</template>

<style scoped lang="scss">
.revealer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--neutral-600);
  clip-path: inset(0 100% 0 0);
  z-index: 99;
}
</style>
