<template>
  <div
    class="col-span-1 border-4 border-white p-8 shadow-xl bg-gray-50 rounded-lg"
  >
    <p class="font-bold text-xl mb-5">Market Order</p>
    <div>
      <div class="flex-container">
        <p>Share price</p>
        <p>{{ openPrice }}</p>
      </div>
      <form>
        <div class="flex-container mt-7">
          <label class="my-auto">Shares</label>
          <input
            type="number"
            class="w-16 text-center p-1 rounded-sm bg-gray-100 text-purple text-bold"
            v-model="shares"
          />
        </div>
      </form>
      <div class="flex-container my-7">
        <p>Market price</p>
        <p>{{ marketPrice }}</p>
      </div>

      <div class="border-b border-gray-300 my-7"></div>

      <div class="flex-container">
        <p>Buying Power</p>
        <p>{{ buyingPower }}</p>
      </div>

      <div class="flex-container my-5">
        <p>Final cost</p>
        <p>{{ finalCost }}</p>
      </div>

      <button
        class="button bg-purple w-full"
        @click="handleSubmit"
        type="submit"
      >
        Buy shares
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
import { COMMISSION } from '../utils/constants'
import { mapGetters } from 'vuex'

export default {
  name: 'MarketOrder',
  props: {
    openPrice: Number,
    ticker: String
  },
  data() {
    return {
      shares: ''
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()

      let payload = {
        action: 'buy',
        marketPrice: this.marketPrice
      }
      await this.$store.dispatch('simulator/modifyBuyingPower', payload)

      payload = {
        ticker: this.ticker,
        shares: this.shares,
        sharePrice: this.openPrice,
        marketPrice: this.marketPrice
      }
      await this.$store.dispatch('simulator/addStock', payload)
    }
  },
  computed: {
    ...mapGetters({
      buyingPower: 'simulator/buyingPower'
    }),
    marketPrice() {
      const price = this.openPrice * this.shares || 0
      return Math.round(price * 1000) / 1000
    },
    commissionPrice() {
      return `$${COMMISSION}.00`
    },
    finalCost() {
      if (this.shares >= 1) {
        return this.marketPrice
      }

      return 0
    }
  }
}
</script>

<style scoped>
.flex-container {
  @apply flex justify-between;
}

.flex-container p:nth-child(2n) {
  @apply text-purple font-bold;
}
</style>
