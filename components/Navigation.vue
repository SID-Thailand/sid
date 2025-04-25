<script lang="ts" setup>
import { gsap } from '~/libs/gsap'
import type { iMenuLink } from '~/types/menuTypes'

interface iProps {
  links: iMenuLink[]
}

const props = defineProps<iProps>()

const emit = defineEmits(['close'])

const imagesRef = ref<HTMLElement | null>(null)

const onMouseEnter = (e: MouseEvent, idx: number) => {
  const target = e.currentTarget as HTMLElement

  const targetBounds = target.getBoundingClientRect()

  const clientY = target.offsetTop - targetBounds.height / 2

  const $images = imagesRef.value?.querySelectorAll(
    '.navigation__image-wrapper'
  )
  const $image = $images[idx] as HTMLElement

  if ($image) {
    gsap.to(imagesRef.value, { duration: 0.5, y: clientY })

    gsap.fromTo(
      $image,
      {
        clipPath: 'inset(100% 0 0 0)',
        scale: 1.2,
      },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.7,
        scale: 1,
        ease: 'power2.out',
      }
    )
  }
}

const onMouseLeave = (idx: number) => {
  const $images = imagesRef.value?.querySelectorAll(
    '.navigation__image-wrapper'
  )
  const $image = $images[idx] as HTMLElement

  if ($image) {
    gsap.to($image, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.7,
      scale: 1.2,
      ease: 'power2.out',
    })
  }
}

onMounted(() => {
  const $images = imagesRef.value?.querySelectorAll(
    '.navigation__image-wrapper'
  )

  if ($images) {
    $images.forEach($image => {
      gsap.set($image, {
        clipPath: 'inset(100% 0 0 0)',
        scale: 1.2,
      })
    })
  }
})

const { selectedLang, defaultLocale } = useLang()

const updatedLinks = computed(() => {
  return props.links.map(item => {
    if (item?.link?.cached_url.includes('home')) {
      return {
        ...item,
        link: {
          ...item.link,
          cached_url:
            selectedLang.value === defaultLocale()
              ? '/'
              : '/' + selectedLang.value,
        },
      }
    }

    return item
  })
})
</script>

<template>
  <nav class="navigation">
    <NuxtLink
      v-for="(item, idx) in updatedLinks"
      :key="idx"
      :to="`/${item?.link?.cached_url?.replace(/^\/+/, '')}`"
      class="navigation__link"
      @click="emit('close')"
      @mouseenter="onMouseEnter($event, idx)"
      @mouseleave="onMouseLeave(idx)"
    >
      {{ item?.label }}
    </NuxtLink>
    <div ref="imagesRef" class="navigation__images">
      <div
        v-for="(item, idx) in links"
        :key="idx"
        class="navigation__image-wrapper"
        :style="{
          zIndex: idx,
        }"
      >
        <CustomImage :src="item?.asset?.filename" :alt="item?.asset?.alt" />
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  position: relative;

  .router-link-active {
    color: var(--basic-white);
  }

  @media (max-width: $br1) {
    gap: 12px;
  }
}

.navigation__link {
  @include med;
  color: var(--neutral-300);
  transition: color 0.3s ease;
  font-size: min(88px, vh(88));
  line-height: 1em;
  text-align: center;

  @media (max-width: $br1) {
    font-size: size(88, 36);
  }

  @media (max-width: $br4) {
    font-size: 36px;
  }

  &:hover {
    color: var(--basic-white);
  }
}

.navigation__images {
  position: absolute;
  top: 0;

  right: vh(-40);
  width: vh(160);
  height: vh(160);
  overflow: hidden;

  @media (max-width: $br1) {
    display: none;
  }
}
.navigation__image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
