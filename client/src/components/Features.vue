<template>
  <div class="p-10">
    <h3 class="text-center text-purple text-2xl font-bold mb-8">Features</h3>
    <div class="grid grid-cols-3 gap-5">
      <div class="info-container">
        <p class="info-text">
          You can build and monitor custom watchlists to stay on top of your
          stocks.
        </p>
      </div>
      <div class="info-container">
        <p>
          Enable SMS notifications, so you can stay up to date with stocks and
          not miss a beat.
        </p>
      </div>
      <div class="info-container">
        <p>Take action when one of your stocks reaches a certain price.</p>
      </div>
      <div class="info-container">
        <div>
          <p>
            Use the simulator to get your financial feet wet. Submit trades in a
            virtual environment before taking on the real world
          </p>
        </div>
      </div>
      <div class="info-container">
        <p>
          Follow your friends and take a look at how their portfolios are doing!
        </p>
      </div>
      <div class="info-container">
        <p>
          Fully responsive. Enjoy this app across any device and screen size
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
export default {
  name: 'Features'
}
</script>

<style lang="scss" scoped>
.info-container {
  @apply border-4 border-white rounded-sm shadow-lg bg-gray-50 text-center p-5;
  p {
    @apply text-xl;
  }
  svg {
    @apply mx-auto h-14 w-14 mb-5 text-purple;
  }
}
</style>
