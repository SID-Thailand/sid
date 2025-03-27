<script lang="ts" setup>
interface IProps {
  tag?: string
  type?: 'button' | 'submit' | 'reset'
  href?: string
}

const props = withDefaults(defineProps<IProps>(), {
  tag: 'button',
  type: 'button',
})

const tag = computed(() => {
  if (props.tag === 'nuxt-link') {
    return resolveComponent('NuxtLink')
  } else return props.tag ?? 'button'
})

const to = props.tag === 'nuxt-link' ? props.href : undefined
const href = props.tag === 'a' ? props.href : undefined
</script>

<template>
  <component
    :is="tag"
    :type="type"
    :to="to"
    :href="href"
    :target="props.tag === 'a' ? '_blank' : undefined"
    :rel="props.tag === 'a' ? 'noreferer noopener' : undefined"
  >
    <slot />
  </component>
</template>
