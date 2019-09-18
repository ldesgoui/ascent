<template>
  <div class="flex flex-wrap">
    <n-link
      v-for="product in products"
      :key="product.slug"
      :to="`/store/product/${product.slug}`"
      class="block w-full lg:w-1/2 mb-16 lg:mb-0 lg:pr-4"
    >
      <ascent-product :product="product" />
    </n-link>
  </div>
</template>

<script>
import AscentProduct from "~/components/product.vue"

export default {
  head: {
    title: "Store",
  },

  components: {
    AscentProduct,
  },

  computed: {
    products() {
      return this.$store.state.products
    },
  },
}
</script>
