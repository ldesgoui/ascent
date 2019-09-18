<template>
  <div
    class="mt-16 font-ascent text-6xl font-bold tracking-widest leading-none uppercase"
  >
    <h1 v-if="error.statusCode === 404">Page<br />not<br />found</h1>
    <h1 v-else>An<br />error<br />occurred</h1>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },

  head() {
    return {
      title:
        this.error.statusCode === 404 ? "Page not found" : "An error occurred",
    }
  },
}
</script>
