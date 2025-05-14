<script lang="ts" setup>
interface iProps {
  title?: string
  description?: string
  ogImage?: string
  twitterImage?: string
  schema?: string
}

const props = defineProps<iProps>()

if (props.schema) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: props.schema,
      },
    ],
  })
}
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />

    <Meta name="og:title" :content="title" />
    <Meta name="title" property="og:title" :content="title" />
    <Meta name="og:description" :content="description" />

    <Meta name="twitter:title" :content="title" />
    <Meta name="twitter:description" :content="description" />

    <Meta v-if="twitterImage" name="twitter:image" :content="twitterImage" />

    <Meta v-if="ogImage" property="og:image" :content="ogImage" />
  </Head>
</template>
