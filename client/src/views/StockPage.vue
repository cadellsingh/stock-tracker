<template>
  <Layout>
    <p v-if="error">{{error}}</p>
    <LoadingSpinner v-else-if="loading" message="loading" />
    <div v-else class="mt-10">
      <div class="mb-10">
        <div class="flex justify-between">
          <p class="font-bold text-purple text-2xl my-auto">
            {{ticker}}
          </p>
          <div>
            <p class="mb-2 error" v-if="watchlistError">{{watchlistError}}</p>
            <p class="mb-2 text-green-700 font-semibold" v-if="successMsg">{{successMsg}}</p>
            <p class="button bg-purple" @click="handleAddStock">Add to watchlist</p>
          </div>
        </div>
        <p class="font-bold text-xl">{{prices.open}}</p>
      </div>

      <div class="grid grid-cols-3 gap-x-5">
        <StatisticsOverview :prices="prices" />
        <MarketOrder :openPrice="prices.open" :ticker="ticker" />
      </div>

      <StockNews :news="news" />
    </div>
  </Layout>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
import Layout from '../components/Layout.vue'
import StatisticsOverview from '../components/StatisticsOverview.vue'
import StockNews from '../components/StockNews.vue'
import MarketOrder from '../components/MarketOrder.vue'
import {mapGetters, mapActions} from 'vuex'
import LoadingSpinner from "@/components/LoadingSpinner.vue"

export default {
  name: 'StockPage',
  components: {
    StatisticsOverview,
    StockNews,
    MarketOrder,
    Layout,
    LoadingSpinner
  },
  data() {
    return {
      prices: {},
      news: [],
      loading: false,
      error: '',
      watchlistError: '',
      successMsg: ''
    }
  },
  watch: {
    async search() {
      await this.fetchStockDetails()
    }
  },
  async mounted() {
    this.watchlistError = ''
    await this.fetchStockDetails()
  },
  computed: {
    ...mapGetters({
      search: 'misc/search',
      watchlist: 'watchlist/watchlist'
    }),
    ticker() {
      return this.search.toUpperCase()
    }
  },
  methods: {
    ...mapActions({
      fetchStockPrices: 'watchlist/fetchStockPrices',
      fetchStockNews: 'watchlist/fetchStockNews',
      fetchWatchlist: 'watchlist/fetchWatchlist',
      addStockToWatchlist: 'watchlist/addStock'
    }),
    async handleAddStock() {
      this.watchlistError = ''

      if (this.watchlist.length === 0) {
        await this.fetchWatchlist()
      }

      const index = this.watchlist.findIndex(el => {
        return el.stockTicker.toLowerCase() === this.search.toLowerCase()
      })

      if (index === -1) {
        const payload = {
          stockTicker: this.search
        }
        const response = await this.addStockToWatchlist(payload)
        if (response) {
          this.successMsg = 'Stock added'
        }
      } else {
        this.watchlistError = 'That stock is already added'
      }
    },
    async fetchStockDetails() {
      this.loading = true
      this.error = ''
      try {
        if (this.search) {
          const promises = [this.fetchStockPrices(this.search), this.fetchStockNews(this.search)]
          const results = await Promise.all(promises)
          this.prices = results[0]
          this.news = results[1]
        } else {
          this.error = 'Enter a ticker'
        }
      } catch (e) {
        console.warn(e);
        this.error = 'Invalid ticker'
      }
      this.loading = false
    }
  },
}
</script>
