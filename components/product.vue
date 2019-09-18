<template>
  <div class="flex flex-wrap items-center">
    <div class="w-full md:w-1/2 lg:w-full xl:w-1/2 flex flex-col items-center">
      <div class="relative pr-6 pb-6">
        <div class="w-64 h-64 bg-blue-500 absolute bottom-0 right-0 -z-10" />

        <img
          :src="require(`~/static/uploads/${product.thumbnail.substring(9)}`)"
          class="block"
        />
      </div>
    </div>

    <div class="w-full md:w-1/2 lg:w-full xl:w-1/2 p-8">
      <h2 class="ascent-text-heading text-4xl lg:text-5xl whitespace-pre-line">
        <!--
      -->{{ product.name.split(" ").join("\n") }}
      </h2>

      <p class="ascent-text mt-12 normal-case">
        {{ product.shortDescription }}
      </p>

      <p class="ascent-text mt-16">${{ $showMoney(product.price) }} USD</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
}
</script>
