import path from "path"
import glob from "glob"

export default {
  mode: "universal",

  css: ["typeface-montserrat"],

  plugins: [
    "~/plugins/carousel.client.js",
    "~/plugins/load-script.client.js",
    "~/plugins/modal.client.js",
    "~/plugins/persist-state.client.js",
    "~/plugins/show-money.js",
  ],

  buildModules: ["@nuxtjs/eslint-module", "@nuxtjs/tailwindcss"],

  modules: ["@bazzite/nuxt-optimized-images", "@nuxtjs/pwa", "@nuxtjs/sitemap"],

  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /.ya?ml$/,
        use: "js-yaml-loader",
      })
    },
  },

  generate: {
    fallback: true,
    routes: dynamicRoutes(),
  },

  env: {
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
  },

  head: {
    titleTemplate: chunk =>
      chunk ? `${chunk} // Ascent Esports` : "Ascent Esports",
  },

  loading: { color: "#000" },

  pwa: {
    meta: {
      name: "Ascent Esports",
      author: "Ascent Esports",
      description:
        "We are Ascent // Competing in CS:GO, TF2 and Quake Champions since 2017",
      twitterSite: "AscentEsports",
      twitterCreator: "wyattriver_",
    },
  },

  sitemap: {
    hostname: "https://ascent.gg/",
    gzip: true,
    exclude: ["/admin"],
  },

  optimizedImages: {
    optimizeImages: true,
  },
}

function dynamicRoutes() {
  return glob
    .sync("products/*", { cwd: "content" })
    .map(p => `/store/product/${path.basename(p, ".yml")}`)
}
