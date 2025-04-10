<template>
  <div class="preloader">
    <div class="preloader__dot"></div>
  </div>
</template>

<style lang="scss">
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--neutral-600);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preloader__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: white;
  animation: preloader-dot 2s infinite ease-in-out;
}

@keyframes preloader-dot {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .preloader__dot {
    animation: none;
  }
}

.loader-enter-from {
  opacity: 0;
}

.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.4s;
}
.loader-enter,
.loader-leave-to {
  opacity: 0;
}
</style>
