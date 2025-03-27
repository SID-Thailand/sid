<template>
  <transition name="fade">
    <div class="headless-loader" :style="{ height: '1em', width: '1em' }">
      <svg class="circular" viewBox="25 25 50 50">
        <circle
          class="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="2"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.headless-loader {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.circular {
  animation: rotate 2s linear infinite;
  transform-origin: center center;
  position: absolute;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
  stroke: currentColor;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
