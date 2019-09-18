<template>
  <nav class="flex flex-col md:flex-row md:items-center">
    <div
      v-for="(link, title) in links"
      :key="title"
      class="mb-4 md:mb-0 md:mr-4 lg:mr-8 last:mr-0"
    >
      <n-link :to="link" class="ascent-btn">/ {{ title }} /</n-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    links: {
      type: Object,
      default: null,
    },
  },
}
</script>
