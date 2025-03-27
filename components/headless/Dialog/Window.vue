<script lang="ts" setup>
interface IProps {
  transitionName?: string
}

withDefaults(defineProps<IProps>(), {
  transitionName: 'fade',
})

const $el = ref<HTMLElement | null>(null)

const dialogId = inject('dialogId') as string

const registerWindow = inject('registerWindow') as (_el: HTMLElement) => void

onMounted(() => {
  // @ts-expect-error
  registerWindow($el)
})
</script>

<template>
  <Transition :name="transitionName">
    <div
      :id="dialogId"
      ref="$el"
      tabindex="-1"
      role="document"
      data-dialog-window
      v-bind="$attrs"
    >
      <slot />
    </div>
  </Transition>
</template>
