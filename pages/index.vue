<template>
  <div class="min-h-screen pb-64 md:pb-0 p-8 lg:px-24 ascent-bg-mountain">
    <div
      class="w-32 lg:w-64 text-gray-900 fill-current"
      v-html="require('~/assets/img/logo.svg?include')"
    />

    <h1 class="mb-8 lg:mb-16 ascent-text-heading text-gray-900">
      Ascent<br />Esports
    </h1>

    <p class="mb-4 lg:mb-8 ascent-text">Est 2017</p>

    <p class="mb-8 lg:mb-16 ascent-text">
      <n-link to="/team#na-csgo">CSGO</n-link>
      //
      <n-link to="/team#na-tf2">TF2</n-link>
      //
      <n-link to="/team#na-qc">Quake</n-link>
    </p>

    <ascent-nav
      class="mb-8 lg:mb-8"
      :links="{
        'The Team': '/team',
        'Store': '/store',
        'Contact Us': '/contact',
      }"
    />

    <div class="flex">
      <a
        class="p-4 inline-block"
        href="https://twitter.com/ascentesports"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="~simple-icons/icons/twitter.svg" class="w-6 lg:w-8" />
      </a>

      <a
        class="p-4 inline-block"
        href="https://instagram.com/ascentesports"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="~simple-icons/icons/instagram.svg" class="w-6 lg:w-8" />
      </a>

      <a
        class="p-4 inline-block"
        href="https://youtube.com/ascentesports"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="~simple-icons/icons/youtube.svg" class="w-6 lg:w-8" />
      </a>

      <a
        class="p-4 inline-block"
        href="https://www.twitch.tv/team/ascentesports"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="~simple-icons/icons/twitch.svg" class="w-6 lg:w-8" />
      </a>
    </div>
  </div>
</template>

<script>
import AscentNav from "~/components/nav.vue"

export default {
  head: {
    script: [
      { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" },
    ],
  },

  layout: "nothing",

  components: {
    AscentNav,
  },
}
</script>
