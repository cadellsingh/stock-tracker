<template>
  <div class="border-b mb-10 p-5">
    <Layout>
      <nav class="flex justify-between">
        <ul class="flex space-x-3 list-item-container my-auto">
          <router-link
            class="button-style"
            tag="li"
            v-for="link in links"
            :to="link.url"
            :key="link.url"
            >{{ link.title }}
          </router-link>
          <li @click="handleLogOut">Log out</li>
        </ul>
        <div
          class="flex justify-between rounded-sm border-grey-light border-2 p-2 my-auto"
        >
          <!-- <SearchIcon class="h-5 w-5 my-auto" /> -->
          <form @submit="handleSearch">
            <input
              class="text-sm placeholder-gray-600 outline-none text-gray-600 truncate-text ml-4 bg-gray-100"
              v-model="search"
              type="text"
              placeholder="Search stock"
            />
          </form>
        </div>
      </nav>
    </Layout>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
// import { SearchIcon } from '@heroicons/vue/outline'
import Layout from '../components/Layout.vue'

export default {
  name: 'Navbar',
  components: {
    Layout
    // SearchIcon,
  },
  data() {
    return {
      links: [
        { title: 'Account', url: '/user/account' },
        { title: 'Watchlist', url: '/user/watchlist' },
        { title: 'Simulator', url: '/user/simulator' }
        // { title: 'Reports', url: '/user/reports' },
      ],
      search: ''
    }
  },
  methods: {
    async handleSearch(e) {
      e.preventDefault()
      await this.$store.dispatch('misc/setSearch', this.search)
      const currentRoute = this.$route.name
      if (currentRoute !== 'StockPage') {
        this.$router.push('StockPage')
      }
    },
    async handleLogOut() {
      await this.$store.commit('logout')
      this.$router.push({ name: 'Index' })
    }
  }
}
</script>

<style scoped>
.list-item-container li {
  @apply p-2 cursor-pointer hover:text-purple text-lg;
}

.router-link-active {
  @apply border-purple border;
}
</style>
