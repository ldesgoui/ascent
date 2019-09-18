import Vue from "vue"

export const state = () => ({
  basket: {},
  products: [],
})

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch("getProducts")
  },

  async getProducts({ commit }) {
    const ctx = await require.context("~/content/products", false, /\.ya?ml$/)
    commit("setProducts", ctx.keys().map(ctx))
  },
}

export const mutations = {
  setProducts(state, products) {
    Vue.set(state, "products", products)
  },

  emptyBasket(state) {
    Vue.set(state, "basket", {})
  },

  addToBasket(state, sku) {
    Vue.set(state.basket, sku, (state.basket[sku] || 0) + 1)
  },

  removeFromBasket(state, sku) {
    if (state.basket[sku] === 0) {
      Vue.delete(state.basket, sku)
      return
    }

    Vue.set(state.basket, sku, (state.basket[sku] || 1) - 1)
  },
}

export const getters = {
  itemCount: state => Object.values(state.basket).reduce((a, c) => a + c, 0),

  bySlug: state =>
    state.products.reduce(
      (acc, product) => ({ ...acc, [product.slug]: product }),
      {}
    ),

  bySku: state =>
    state.products.reduce(
      (acc, product) =>
        product.sizes.reduce(
          (acc, size) => ({ ...acc, [size.sku]: { product, size } }),
          acc
        ),
      {}
    ),

  stockRemaining: (state, getters) =>
    Object.values(getters.bySku).reduce(
      (acc, { size }) => ({
        ...acc,
        [size.sku]:
          size.quantity - size.purchased - (state.basket[size.sku] || 0),
      }),
      {}
    ),

  shippingType(state) {
    const skus = Object.keys(state.basket).filter(sku => state.basket[sku])

    return skus.every(sku => sku.includes("shirt"))
      ? "shirts-only"
      : skus.every(sku => sku.include("hoodie"))
      ? "hoodies-only"
      : "full"
  },

  itemTotal: (state, getters) =>
    Object.keys(state.basket).reduce(
      (acc, sku) => acc + getters.bySku[sku].product.price * state.basket[sku],
      0
    ),
}
