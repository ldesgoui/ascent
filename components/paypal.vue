<template>
  <div />
</template>

<script>
import lookup from "country-code-lookup"

export default {
  async mounted() {
    await this.$loadScript(
      `https://www.paypal.com/sdk/js?${new URLSearchParams({
        "client-id": process.env.paypalClientId,
        "integration-date": "2019-08-16",
      })}`
    )

    const vm = this

    window.paypal
      .Buttons({
        style: {
          color: "black",
          shape: "rect",
        },

        createOrder(data, actions) {
          return actions.order.create(vm.order("US"))
        },

        onShippingChange(data, actions) {
          const shipping = vm.shipping(data.shipping_address.country_code)

          if (shipping === null) {
            return actions.reject()
          }

          return actions.order.patch([
            {
              op: "replace",
              path: "/purchase_units/@reference_id=='default'/amount",
              value: vm.amount(shipping),
            },
          ])
        },

        onApprove(data, actions) {
          return actions.order.capture().then(details => {
            vm.$store.commit("emptyBasket")
            vm.$emit("approve", details)
          })
        },

        onError(err) {
          vm.$emit("error", err)
        },
      })
      .render(this.$el)
  },

  methods: {
    order(countryCode) {
      return {
        purchase_units: [
          {
            amount: this.amount(this.shipping(countryCode)),
            description: "Your purchase of Ascent Esports merchandise",
            items: this.items(),
          },
        ],
      }
    },

    amount(shipping) {
      return {
        currency_code: "USD",
        value: this.$showMoney(this.$store.getters.itemTotal + shipping),
        breakdown: {
          item_total: {
            currency_code: "USD",
            value: this.$showMoney(this.$store.getters.itemTotal),
          },
          shipping: {
            currency_code: "USD",
            value: this.$showMoney(this.shipping("US")),
          },
        },
      }
    },

    items() {
      return Object.entries(this.$store.state.basket).map(([sku, quantity]) => {
        const { product, size } = this.$store.getters.bySku[sku]

        return {
          name: `${product.name} (${size.name})`,
          quantity,
          sku,
          unit_amount: {
            value: this.$showMoney(product.price),
            currency_code: "USD",
          },
        }
      })
    },

    shipping(countryCode) {
      const country = lookup.byIso(countryCode)

      if (!country) {
        return null
      }

      if (country.iso2 === "US") {
        if (this.$store.getters.shippingType === "shirts-only") {
          return 400
        }

        if (this.$store.getters.shippingType === "hoodies-only") {
          return 800
        }
        return 1000
      }

      if (country.iso2 === "CA") {
        return 2000
      }

      if (country.continent === "Europe") {
        return 2500
      }

      if (country.continent === "Asia" || country.continent === "Oceania") {
        return 3500
      }

      return null
    },
  },
}
</script>
