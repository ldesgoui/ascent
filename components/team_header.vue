<template>
  <div class="flex flex-col md:flex-row md:items-center">
    <div>
      <div class="slant-game px-6 flex items-center bg-orange-500">
        <div
          class="mr-4 inline-block w-10 text-white fill-current"
          v-html="gameLogoComponent"
        />

        <div class="inline-block ascent-text font-bold text-base text-white">
          <span class="md:hidden">{{ shortName }}</span>
          <span class="hidden md:inline">{{ fullName }}</span>
        </div>
      </div>

      <div class="slant-flag px-8 flex items-center bg-gray-300">
        <img :src="flagSrc" class="w-16" />
      </div>
    </div>

    <div v-if="highlights" class="mt-4 md:mt-0 md:ml-8">
      <a
        class="ascent-btn font-bold text-gray-700"
        :href="highlights"
        target="_blank"
      >
        Team Highlights >
      </a>
    </div>
  </div>
</template>

<script>
import EUFlag from "svg-country-flags/svg/eu.svg"
import USFlag from "svg-country-flags/svg/us.svg"

import CSGOLogo from "~/assets/img/csgo.svg?include"
import QCLogo from "~/assets/img/qc.svg?include"
import TF2Logo from "~/assets/img/tf2.svg?include"

export default {
  props: {
    game: {
      type: String,
      default: null,
    },
    flag: {
      type: String,
      default: null,
    },
    highlights: {
      type: String,
      default: null,
    },
  },

  computed: {
    gameLogoComponent() {
      return (
        {
          TF2: TF2Logo,
          CSGO: CSGOLogo,
          QC: QCLogo,
        }[this.game] || TF2Logo
      )
    },

    shortName() {
      return (
        {
          TF2: "TF2",
          CSGO: "CS:GO",
          QC: "QC",
        }[this.game] || "TF2"
      )
    },

    fullName() {
      return (
        {
          TF2: "Team Fortress 2",
          CSGO: "CS: Global Offensive",
          QC: "Quake Champions",
        }[this.game] || "Team Fortress 2"
      )
    },

    flagSrc() {
      return (
        {
          EU: EUFlag,
          US: USFlag,
        }[this.flag] || USFlag
      )
    },
  },
}
</script>

<style scoped>
.slant-game {
  float: left;
  position: relative;
  height: 56px;

  &:after {
    z-index: 1;
    position: absolute;
    right: -20px;
    top: 0;
    content: "";
    border-bottom: 20px solid transparent;
    border-left: 10px solid transparent;
    border-right: 20px solid transparent;
    border-top: 56px solid theme("colors.orange.500");
  }
}

.slant-flag {
  float: left;
  position: relative;
  height: 56px;

  &:after {
    position: absolute;
    right: 0;
    top: -20px;
    content: "";
    border-bottom: 57px solid white;
    border-left: 20px solid transparent;
    border-right: 0 solid transparent;
    border-top: 20px solid transparent;
  }
}
</style>
