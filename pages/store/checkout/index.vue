<template>
  <div
    class="mx-auto font-ascent font-light text-xl uppercase"
    style="max-width: 750px"
  >
    <div v-if="!hasItems || !stockCanProvide" class="p-8 bg-red-300">
      <p>Cannot check out</p>
      <p v-if="!hasItems">Nothing in Basket</p>
      <p v-if="!stockCanProvide">Not enough stock for certain items</p>
    </div>

    <div
      v-for="item in items"
      :key="item.sku"
      class="mt-8 p-2 flex flex-col md:flex-row md:items-center border-b border-gray-400"
    >
      <n-link
        :to="`/store/product/${item.sku}`"
        class="block flex-grow mr-4"
        :class="{ 'bg-red-200': stockRemaining[item.sku] < 0 }"
      >
        {{ item.name }}, size {{ item.size }}
      </n-link>

      <div class="mt-4 md:mt-0 self-end">
        <p class="mr-4 inline-block">
          <button class="w-8 text-center" @click="removeFromBasket(item.sku)">
            -
          </button>

          <span style="font-variant-numeric: tabular-nums">
            {{ item.quantity }}
          </span>

          <button class="w-8 text-center" @click="addToBasket(item.sku)">
            +
          </button>
        </p>

        <p class="w-40 text-right inline-block">
          ${{ $showMoney(item.quantity * item.price) }} USD
        </p>
      </div>
    </div>

    <div
      class="mt-8 p-2 flex flex-col md:flex-row md:items-center border-b border-gray-400"
    >
      <p class="font-normal flex-grow">
        Total before shipping
      </p>
      <p class="w-40 text-right self-end">${{ $showMoney(itemTotal) }} USD</p>
    </div>

    <div class="mt-8 p-2">
      <p class="flex-grow">
        Flat rate shipping
      </p>
    </div>

    <div
      v-for="(price, cond) in {
        'United States, shirts only': 400,
        'United States, hoodies only': 800,
        'United States': 1000,
        'Canada': 2000,
        'Europe': 2500,
        'Asia and Oceania': 3500,
      }"
      :key="cond"
      class="mt-2 p-2 flex flex-col md:flex-row md:items-center"
    >
      <p class="flex-grow text-base md:text-right mr-4">
        {{ cond }}
      </p>
      <p class="w-40 text-right self-end">
        ${{ (price / 100).toFixed(2) }} USD
      </p>
    </div>

    <paypal class="mt-8 lg:mt-16" @approve="onApprove" @error="onError" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import Paypal from "~/components/paypal.vue"

export default {
  head: {
    title: "Checkout",
  },

  components: {
    Paypal,
  },

  computed: {
    ...mapGetters(["itemTotal", "stockRemaining"]),

    hasItems() {
      return this.$store.getters.itemCount > 0
    },

    stockCanProvide() {
      return Object.values(this.$store.getters.stockRemaining).every(
        stock => stock >= 0
      )
    },

    items() {
      return Object.entries(this.$store.state.basket).map(([sku, quantity]) => {
        const { product, size } = this.$store.getters.bySku[sku]

        return {
          sku,
          quantity,
          size: size.name,
          name: product.name,
          price: product.price,
        }
      })
    },
  },

  methods: {
    ...mapMutations(["addToBasket", "removeFromBasket"]),

    onApprove() {
      this.$router.push("/store/checkout/completed")
    },

    onError(err) {
      /* eslint-disable no-console */
      console.log(err)
      /* eslint-enable no-console */
    },
  },
}
</script>
