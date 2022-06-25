<template>
  <td v-if="loading">Loading...</td>
  <td v-else :class="marketPriceColor">{{marketPrice}}</td>
</template>

<script>
export default {
  name: 'MarketPrice',
  props: {
    ticker: Object
  },
  data() {
    return {
      loading: false,
      marketPrice: ''
    }
  },
  async mounted() {
    this.loading = true
    const stock = await this.$store.dispatch('watchlist/fetchStockPrices', this.ticker.stockTicker)
    this.marketPrice = stock.open * this.ticker.amountOfShares
    this.loading = false
  },
  computed: {
    marketPriceColor() {
      const costBasis = this.ticker.amountOfShares * this.ticker.sharePrice
      return costBasis >= this.marketPrice ? 'text-green-500' : 'text-red-500'
    }
  }
}
</script>