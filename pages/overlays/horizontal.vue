<template>
  <div class="flex flex-wrap items-center bg-red-500 animation-low">
    <img class="w-1/3" src="~/assets/img/sponsors/marketplace.png" />
    <div class="w-1/3" v-html="require('~/assets/img/logo.svg?include')" />
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
    document.querySelectorAll("svg > path").forEach(el => {
      const len = el.getTotalLength()

      el.style.strokeDasharray = len
      el.style.strokeDashoffset = len
    })

    while (true) {
      await sleep(5000)
      this.$el.classList.add("animation-rise")
      this.$el.classList.remove("animation-low")
      await sleep(5000)
      this.$el.classList.add("animation-high")
      this.$el.classList.remove("animation-rise")
      await sleep(5000)
      this.$el.classList.add("animation-fall")
      this.$el.classList.remove("animation-high")
      await sleep(5000)
      this.$el.classList.add("animation-low")
      this.$el.classList.remove("animation-fall")
    }
  },
}
</script>

<style>
svg,
img {
  filter: drop-shadow(0 0 2vw black);
}

svg path {
  stroke: white;
  stroke-width: 4;
}

.animation-low,
.animation-rise {
  & svg path {
    fill: transparent;
  }

  & img {
    opacity: 0;
  }
}

.animation-rise {
  & svg path {
    animation: 3s ease forwards stroke-in, 500ms ease forwards 2s fill-in;
  }

  & img {
    animation: 500ms ease forwards 2s opacity-in;
  }
}

@keyframes stroke-in {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fill-in {
  to {
    fill: white;
    stroke: transparent;
  }
}

@keyframes opacity-in {
  to {
    opacity: 1;
  }
}

.animation-high,
.animation-fall {
  & svg path {
    fill: white;
    stroke: transparent;
  }

  & img {
    opacity: 1;
  }
}

.animation-fall {
  & svg path {
    animation: 500ms forwards fill-out;
  }

  & img {
    animation: 500ms forwards opacity-out;
  }
}

@keyframes fill-out {
  to {
    fill: transparent;
    stroke: white;
  }
}

@keyframes opacity-out {
  to {
    opacity: 0;
  }
}
</style>
