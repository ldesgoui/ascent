<template>
  <div class="min-h-screen p-8 lg:px-24 mx-auto" style="max-width: 2560px">
    <header class="mb-8 lg:mb-16 flex items-center justify-between">
      <n-link to="/">
        <img src="~/assets/img/logo.svg" class="w-16 lg:w-32" />
      </n-link>

      <ascent-nav
        v-if="$route.path.startsWith('/store')"
        :links="{
          Home: '/',
          Store: '/store',
          [basketLabel]: '/store/checkout',
        }"
      />

      <ascent-nav
        v-else
        :links="{
          'Home': '/',
          'The Team': '/team',
          'Store': '/store',
        }"
      />
    </header>

    <nuxt />
  </div>
</template>

<script>
import AscentNav from "~/components/nav.vue"

export default {
  components: {
    AscentNav,
  },

  computed: {
    basketLabel() {
      const count = this.$store.getters.itemCount
      return count ? `Your Basket (${count})` : "Your Basket"
    },
  },
}
</script>
