# Headless Button Component

This is a flexible and reusable button component that can render as different HTML elements based on the provided `tag` prop. It can act as a standard button, a link, or even a `NuxtLink` component. You can use this component to create buttons with various behaviors while maintaining the ability to customize styles and content.

## Features

- Renders as a `button`, `a`, or `NuxtLink` based on the `tag` prop.
- Supports standard button behavior (`button`, `submit`, `reset` types).
- Handles `href` for links and routing for `NuxtLink`.

## Usage

### Script Setup

```vue
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
```

### Template

```vue
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
```

## Props

| Prop   | Type      | Default     | Description                                      |
| ------ | --------- | ----------- | ------------------------------------------------ | ---------- | ------------------------------------------------------------- |
| `tag`  | `'button' | 'a'         | 'nuxt-link'`                                     | `'button'` | The tag to render. It can be a `button`, `a`, or `nuxt-link`. |
| `type` | `'button' | 'submit'    | 'reset'`                                         | `'button'` | The type of button, used if the tag is `button`.              |
| `href` | `string`  | `undefined` | The `href` attribute for `a` or `nuxt-link` tag. |

## Example Usage

### Basic Button

```vue
<HeadlessButton>
  Click Me
</HeadlessButton>
```

### Link Button (using `<a>` tag)

```vue
<HeadlessButton tag="a" href="https://example.com">
  Go to Example
</HeadlessButton>
```

### NuxtLink Button (using `<NuxtLink>`)

```vue
<HeadlessButton tag="nuxt-link" href="/about">
  Go to About
</HeadlessButton>
```

### Submit Button

```vue
<HeadlessButton type="submit">
  Submit Form
</HeadlessButton>
```

## Customization

- **Tag Change**: You can change the tag that the component renders by setting the `tag` prop to either `'button'`, `'a'`, or `'nuxt-link'`. For `nuxt-link`, make sure to pass the `href` as the routing path.
- **Type**: Use the `type` prop to specify button behavior such as `submit` or `reset`.
- **Link Behavior**: If you set `tag="a"`, it will render an anchor tag (`<a>`) with the `href` prop and optionally open in a new tab (`target="_blank"`) and apply `rel="noreferer noopener"` for security.
