<template>
  <div class="flex flex-wrap items-center">
    <img class="w-1/3" src="~/assets/img/sponsors/marketplace.png" />
    <div class="w-1/3">
      <div
        id="fill"
        class="absolute w-1/3"
        v-html="require('~/assets/img/logo-and-url.svg?include')"
      />
      <div
        id="stroke"
        v-html="require('~/assets/img/logo-and-url.svg?include')"
      />
    </div>
    <img class="w-1/3" src="~/assets/img/sponsors/kovaak.png" />
  </div>
</template>

<script>
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default {
  layout: "nothing",

  async mounted() {
    let cycle = 30000

    if (location.search.includes("vertical")) {
      this.$el.classList.add("flex-col")
    }

    if (location.search.includes("debug")) {
      cycle = 5000
      this.$el.classList.add("bg-red-500")
    }

    document.querySelectorAll("svg > path").forEach(el => {
      const len = el.getTotalLength()

      el.style.strokeDasharray = len
      el.style.strokeDashoffset = len
    })

    while (true) {
      await sleep(cycle)
      this.$el.classList.add("animation-high")
      await sleep(cycle)
      this.$el.classList.remove("animation-high")
    }
  },
}
</script>

<style>
.flex-col :nth-child(1) {
  order: 2;
}

.flex-col .w-1\/3 {
  width: 100%;
}

img,
#fill {
  filter: drop-shadow(0 0 1vw black);
  opacity: 0;
  transition: opacity 500ms;
}

#fill svg {
  fill: white;
}

#stroke path {
  fill: transparent;
  stroke: white;
  stroke-width: 4;
  transition: stroke-dashoffset 3s 500ms;
}

.animation-high {
  & #stroke path {
    stroke: transparent;
    stroke-dashoffset: 0 !important;
    transition: stroke-dashoffset 3s, stroke 500ms 3s;
  }

  & img,
  & #fill {
    opacity: 1;
    transition: opacity 500ms 3s;
  }
}
</style>
