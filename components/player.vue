<template>
  <div class="flex flex-wrap items-center py-4 mt-8 w-full md:w-1/2 xl:w-1/3">
    <div class="w-full md:w-1/2">
      <img
        v-if="player.photo"
        :src="require(`~/static/uploads/${player.photo.substring(9)}`)"
        class="w-full"
      />
      <div
        v-else
        class="w-full bg-gray-900 text-gray-100 fill-current"
        v-html="require('~/assets/img/logo.svg?include')"
      />
    </div>

    <div
      class="max-w-sm mx-auto w-full md:w-1/2 pt-8 md:pt-0 md:pl-4 lg:pl-6 xl:pl-8"
    >
      <h3
        v-if="player.title"
        class="block ascent-text mb-2 text-base md:text-sm xl:text-base"
      >
        {{ player.title }}
      </h3>

      <h2
        class="block pb-2 ascent-text-heading text-4xl md:text-xl lg:text-2xl normal-case truncate"
      >
        {{ player.name }}
      </h2>

      <div class="mt-8">
        <a
          v-if="player.twitch"
          :href="`https://twitch.com/${player.twitch}`"
          target="_blank"
          rel="noopener noreferrer"
          class="mb-2 block group whitespace-no-wrap font-ascent tracking-widest truncate"
        >
          <img src="~simple-icons/icons/twitch.svg" class="w-6 inline-block" />
          <span class="ml-2 group-hover:underline">/ {{ player.twitch }}</span>
        </a>

        <a
          v-if="player.twitter"
          :href="`https://twitter.com/${player.twitter}`"
          target="_blank"
          rel="noopener noreferrer"
          class="mb-2 block group whitespace-no-wrap font-ascent tracking-widest truncate"
        >
          <img src="~simple-icons/icons/twitter.svg" class="w-6 inline-block" />
          <span class="ml-2 group-hover:underline">/ {{ player.twitter }}</span>
        </a>

        <a
          v-if="player.youtube && player.youtube.label && player.youtube.url"
          :href="player.youtube.url"
          target="_blank"
          rel="noopener noreferrer"
          class="mb-2 block group whitespace-no-wrap font-ascent tracking-widest truncate"
        >
          <img src="~simple-icons/icons/youtube.svg" class="w-6 inline-block" />
          <span class="ml-2 group-hover:underline"
            >/ {{ player.youtube.label }}</span
          >
        </a>

        <a
          v-if="player.instagram"
          :href="`https://instagram.com/${player.instagram}`"
          target="_blank"
          rel="noopener noreferrer"
          class="mb-2 block group whitespace-no-wrap font-ascent tracking-widest truncate"
        >
          <img
            src="~simple-icons/icons/instagram.svg"
            class="w-6 inline-block"
          />
          <span class="ml-2 group-hover:underline"
            >/ {{ player.instagram }}</span
          >
        </a>
      </div>

      <div v-if="player.highlights" class="mt-8">
        <a
          class="ascent-btn text-sm inline-block font-bold"
          :href="player.highlights"
          target="_blank"
        >
          Player<br />Highlights >
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      default: null,
    },
  },
}
</script>
