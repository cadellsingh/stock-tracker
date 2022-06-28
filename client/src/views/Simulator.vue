<template>
  <Layout>
    <LoadingSpinner v-if="loading" />
    <div v-else>
      <div class="mb-5">
        <p>Buying Power: {{ buyingPower }}</p>
      </div>
      <div class="border-4 border-white bg-gray-50 shadow-xl rounded-lg">
        <table class="text-left w-full table-container">
          <tr class="bg-gray-100 text-center">
            <td>Symbol</td>
            <td>Shares</td>
            <td>Cost Basis</td>
            <td>Market Price</td>
            <!-- <td>P/L</td> -->
            <td>Actions</td>
          </tr>
          <tr
            v-for="el in simulatedStocks"
            :key="el._id"
            class="bg-gray-100 text-center text-black font-bold border-b-2 border-gray-300"
          >
            <td
              @click="handleStockClick(el.stockTicker)"
              class="cursor-pointer hover:border-red-200"
            >
              {{ el.stockTicker.toUpperCase() }}
            </td>
            <td>{{ el.amountOfShares }}</td>
            <td>{{ costBasis(el) }}</td>
            <MarketPrice :ticker="el" />
            <td @click="handleClosePosition(el)" class="cursor-pointer">
              Close position
            </td>
          </tr>
        </table>
      </div>
    </div>
  </Layout>
</template>

Cost Basis -> how much you paid (shares * stock price(at the time you bought
stock)) Market Price -> shares * current stock price P/L -> Market Price - Cost
Basis (I think)

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */

import Layout from '../components/Layout.vue'
import MarketPrice from '@/components/MarketPrice'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Simulator',
  components: {
    Layout,
    LoadingSpinner,
    MarketPrice
  },
  data() {
    return {
      loading: false,
      marketPriceLoading: false,
      tickerPrices: []
    }
  },
  async mounted() {
    this.loading = true
    await this.fetchSimulatedStocks()
    this.loading = false
  },
  computed: {
    ...mapGetters({
      simulatedStocks: 'simulator/simulatedStocks',
      buyingPower: 'simulator/buyingPower'
    })
    // marketPrice() {},
    // profitLoss() {},
  },
  methods: {
    ...mapActions({
      fetchSimulatedStocks: 'simulator/fetchSimulatedStocks'
    }),
    costBasis(stock) {
      return stock.amountOfShares * stock.sharePrice
    },
    async getMarketPrice(ticker) {
      this.marketPriceLoading = true
      const test = await this.$store.dispatch(
        'watchlist/fetchStockPrices',
        ticker
      )
      console.log('test: ', test)
      this.marketPriceLoading = false

      return 'test'
      // console.log('test: ', test);
    },
    async handleStockClick(ticker) {
      await this.$store.dispatch('misc/setSearch', ticker)
      const currentRoute = this.$route.name
      if (currentRoute !== 'StockPage') {
        this.$router.push('StockPage')
      }
    },
    async handleClosePosition(ticker) {
      console.log(ticker)
      const marketPrice = ticker.amountOfShares * ticker.sharePrice
      const payload = {
        action: 'sell',
        marketPrice: marketPrice
      }

      await this.$store.dispatch('simulator/modifyBuyingPower', payload)
      await this.$store.dispatch('simulator/closePosition', ticker._id)
    }
  }
}
</script>

<style scoped>
.table-container tr {
  @apply border-b;
}

.table-container td {
  @apply p-5;
}
</style>
