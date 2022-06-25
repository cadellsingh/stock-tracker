<template>
  <Layout>
    <LoadingSpinner v-if="loading" message="Loading"/>
    <div v-else>
      <p class="button inline-block bg-purple mb-5" @click="toggleForm">
        New Notification Request
      </p>

      <NotificationForm v-if="toggleNotificationForm" @cancel="toggleForm" @closeForm="toggleForm" />

      <!-- <div class="flex space-x-5 my-5">
        <div class="flex space-x-1">
          <span class="border bg-cyan-900 p-5 rounded-full"></span>
          <p class="my-auto">Tracking</p>
        </div>

        <div class="flex space-x-1">
          <span class="border bg-gray-300 p-5 rounded-full"></span>
          <p class="my-auto">Not Tracking</p>
        </div>
      </div> -->
      <div class="border-4 border-white bg-gray-50 shadow-xl rounded-lg">
        <table class="w-full table-container text-center">
          <tr class="bg-gray-100">
            <td>Symbol</td>
            <td>Open</td>
            <td>High</td>
            <td>Low</td>
            <td>Volume</td>
            <td>Alerted Price</td>
            <td>Actions</td>
          </tr>
          <tr v-for="el in watchlist" :key="el._id" class="bg-gray-100 text-black font-bold border-b-2 border-gray-300">
            <td @click="handleStockClick(el.stockTicker)" class="cursor-pointer hover:border-red-200">
              {{el.stockTicker.toUpperCase()}}
            </td>
            <td>{{el.open}}</td>
            <td class="text-green-500">{{el.high}}</td>
            <td class="text-red-500">{{el.low}}</td>
            <td>{{el.volume}}</td>
            <td>{{alertedPrice(el)}}</td>
            <td @click="handleDelete(el._id)" class="cursor-pointer">&#128465;</td>
          </tr>
        </table>
      </div>
    </div>
  </Layout>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
import {mapGetters, mapActions} from "vuex"
import Layout from '@/components/Layout.vue'
import NotificationForm from '@/components/NotificationForm.vue'
import LoadingSpinner from "@/components/LoadingSpinner.vue"

export default {
  name: 'Watchlist',
  components: {
    Layout,
    NotificationForm,
    LoadingSpinner
  },
  data() {
    return {
      toggleNotificationForm: false,
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      watchlist: 'watchlist/watchlist'
    }),
  },
  methods: {
    ...mapActions({
      fetchWatchlist: 'watchlist/fetchWatchlist',
      deleteStock: 'watchlist/deleteStock'
    }),
    toggleForm() {
      this.toggleNotificationForm = !this.toggleNotificationForm
    },
    alertedPrice(stock) {
      return stock.alertPrice ? stock.alertPrice : 'n/a'
    },
    async handleDelete(id) {
      await this.deleteStock(id)
    },
    async handleStockClick(ticker) {
      await this.$store.dispatch('misc/setSearch', ticker)
      const currentRoute = this.$route.name
      if (currentRoute !== 'StockPage') {
        this.$router.push('StockPage')
      }
    }
  },
  async mounted() {
    this.loading = true
    await this.fetchWatchlist()
    this.loading = false
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
