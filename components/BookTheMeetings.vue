<script lang="ts" setup>
import type { iCTA } from '~/types/story'
import { LucideArrowUpRight } from 'lucide-vue-next'
import { gsap, ScrollTrigger } from '~/libs/gsap'

interface IProps {
  cta: iCTA
}

defineProps<IProps>()

const { isFormModalOpened } = useAppState()

const imgRef = ref<HTMLElement | null>(null)

const st = ref<ScrollTrigger | null>(null)

const animate = () => {
  if (!imgRef.value) return
  const tl = gsap.timeline()

  tl.fromTo(
    imgRef.value,
    { y: '-5%' },
    {
      y: '5%',
      ease: 'none',
    }
  )

  st.value = ScrollTrigger.create({
    trigger: imgRef.value as HTMLElement,
    animation: tl,
    start: () => 'top bottom',
    end: () => `bottom+=${window.innerHeight} bottom`,
    scrub: true,
  })
}

const handleForm = () => {
  isFormModalOpened.value = true
}

onMounted(() => {
  animate()
})

onBeforeUnmount(() => {
  if (st.value) {
    st.value.kill()
  }
})
</script>

<template>
  <div class="meetings container">
    <div class="meetings__wrapper">
      <div class="meetings__bar">
        <span />
      </div>

      <CustomImage
        :src="cta?.content?.backdrop_asset?.filename"
        :alt="cta?.content?.backdrop_asset?.alt"
        class="meetings__bg"
      />
      <div class="mettings__manager-wrapper">
        <div ref="imgRef" class="meetings__manager">
          <CustomImage
            :src="cta?.content?.manager?.content?.masked_photo?.filename"
            :alt="cta?.content?.manager?.content?.masked_photo?.alt"
          />
        </div>
      </div>
      <div class="meetings__content">
        <Logo class="meetings__logo" />

        <h2 class="meetings__title">
          {{ cta?.content?.title }}
        </h2>
        <div class="meetings__about">
          <h3 class="meetings__name">
            {{ cta?.content?.manager?.content?.name }}
          </h3>
          <p class="meetings__position">
            {{ cta?.content?.manager?.content?.position }}
          </p>
        </div>
        <Button type="button" class="meetings__btn" @click="handleForm">
          <span> {{ cta?.content?.button_text }}</span>
          <LucideArrowUpRight />
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.meetings {
  padding-top: vw(136);

  @media (max-width: $br1) {
    padding-top: 72px;
  }
}

.meetings__wrapper {
  position: relative;
  min-height: vw(893);
  padding: vw(100);

  @media (max-width: $br1) {
    min-height: fit-content;
    padding: 40px 24px 60px;
  }
}

.meetings__bar {
  position: absolute;
  top: vw(-40);
  left: 50%;
  transform: translateX(-50%);
  background-image: var(--accent-primary);
  border-top-left-radius: vw(40);
  border-top-right-radius: vw(40);
  height: vw(80);
  width: 95%;
  overflow: hidden;

  @media (max-width: $br1) {
    height: 40px;
    top: -10px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  @media (max-width: $br4) {
    width: 85%;
  }

  span {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--accent-secondary);
    filter: blur(vw(108));
    z-index: 1;

    @media (max-width: $br1) {
      filter: blur(108px);
    }
  }
}

.meetings__bg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-top-left-radius: vw(40);
  border-top-right-radius: vw(40);

  @media (max-width: $br1) {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
}

.mettings__manager-wrapper {
  position: absolute;
  right: vw(78);
  bottom: 0;
  height: vw(793);
  width: vw(536);
  overflow: hidden;

  @media (max-width: $br1) {
    display: none;
  }
}

.meetings__manager {
  display: block;
  width: 100%;
  height: 100%;
}

.meetings__content {
  position: relative;
  z-index: 1;
  max-width: vw(727);
  color: var(--basic-white);
  text-transform: uppercase;

  @media (max-width: $br1) {
    max-width: 100%;
  }
}

.meetings__logo {
  display: block;
  width: vw(80);
  height: vw(80);

  @media (max-width: $br1) {
    display: none;
  }
}

.meetings__title {
  margin-top: vw(32);
  @include heading-h4;

  @media (max-width: $br1) {
    margin-top: 0;
  }
}

.meetings__about {
  display: flex;
  flex-direction: column;
  row-gap: vw(4);
  margin-top: vw(32);

  @media (max-width: $br1) {
    margin-top: 24px;
    row-gap: 2px;
  }
}

.meetings__name {
  font-size: vw(24);
  line-height: 1.2em;
  @include med;

  @media (max-width: $br1) {
    font-size: size(24, 18);
  }

  @media (max-width: $br4) {
    font-size: 18px;
  }
}

.meetings__position {
  @include subheading-h5;
}

.meetings__btn {
  margin-top: vw(60);

  @media (max-width: $br1) {
    margin-top: 40px;
  }
}
</style>
