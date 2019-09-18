<template>
  <div>
    <!-- TODO bg !-->

    <client-only>
      <modal
        class="rounded-none"
        name="sizing-chart"
        :scrollable="true"
        height="auto"
        width="340px"
      >
        <table
          class="m-4 font-body uppercase text-center mx-auto"
          style="border-collapse: collapse"
        >
          <thead>
            <tr>
              <th
                v-for="head in ['', 'Length', 'Width', 'Sleeve']"
                :key="head"
                class="p-4 font-medium text-xs"
              >
                {{ head }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="size in product.sizes" :key="size.name">
              <td class="p-4 border-t border-gray-light text-right">
                {{ size.name }}
              </td>
              <td
                v-for="val in [size.length, size.width, size.sleeve]"
                :key="val"
                class="py-2 px-4 border-t border-gray-light font-light"
              >
                <span>{{ val }}"</span>
                <br />
                <span class="text-xs">{{ val * 2.5 }} cm</span>
              </td>
            </tr>
          </tbody>
        </table>
      </modal>
    </client-only>

    <div class="h-auto flex flex-wrap">
      <div class="w-full xl:w-1/2 xl:order-1">
        <client-only>
          <carousel :per-page="1" pagination-color="#aaa">
            <slide v-for="image in product.images" :key="image">
              <img :src="require(`~/static/uploads/${image.substring(9)}`)" />
            </slide>
          </carousel>
        </client-only>
      </div>

      <div class="w-full xl:w-1/2 mt-16 xl:mt-0">
        <p class="ascent-text font-normal">
          ${{ $showMoney(product.price) }} USD
        </p>

        <div class="mt-8 ascent-text-heading whitespace-pre-line">
          <!--
        -->{{ product.name.split(" ").join("\n") }}
        </div>

        <p class="mt-8 xl:mr-8 ascent-text normal-case whitespace-pre-line">
          <!--
        -->{{ product.description }}
        </p>

        <div class="mt-8">
          <button
            class="inline-block ascent-btn"
            @click="$modal.show('sizing-chart')"
          >
            Sizing Chart
          </button>
        </div>

        <div class="mt-8 flex">
          <button
            v-for="size in product.sizes"
            :key="size.name"
            class="mr-2 px-0 w-12 border-4 ascent-btn"
            :class="
              selected === size.sku ? 'border-black' : 'border-transparent'
            "
            @click="selectSize(size.sku)"
          >
            {{ size.name }}
          </button>
        </div>

        <div class="mt-8 flex items-center">
          <button
            class="px-12 inline-block ascent-btn text-xl lg:text-2xl font-bold text-white"
            :class="
              selected === null
                ? 'bg-gray-500 hover:bg-gray-500 focus:bg-gray-500 cursor-not-allowed'
                : outOfStock
                ? 'bg-red-500 hover:bg-red-500 focus:bg-red-500 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 focus:hover-bg-green-700 active:hover-bg-green-900'
            "
            :disabled="selected === null || outOfStock"
            @click="addToBasket(selected)"
          >
            {{ inBasket ? "In basket" : outOfStock ? "Out of stock" : "Buy" }}
          </button>
          <p
            v-if="stockRemaining > 0 && stockRemaining <= 3"
            class="ml-8 ascent-text text-gray-600 font-normal"
          >
            Only {{ stockRemaining }} remaining
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"

export default {
  head() {
    return {
      title: this.product.name,
    }
  },

  computed: {
    inBasket() {
      return this.$store.state.basket[this.selected] > 0
    },

    stockRemaining() {
      return this.$store.getters.stockRemaining[this.selected] || 0
    },

    outOfStock() {
      return this.stockRemaining <= 0
    },
  },

  asyncData({ params, store }) {
    return {
      product: store.getters.bySlug[params.product],
      selected: null,
    }
  },

  methods: {
    selectSize(size) {
      this.selected = size
    },
    ...mapMutations(["addToBasket"]),
  },
}
</script>
