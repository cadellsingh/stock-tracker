<template>
  <Layout>
    <div class="max-w-lg mx-auto border rounded p-3">
      <LoadingSpinner v-if="loading" />
      <form v-else>
        <input
          v-model="email"
          class="form-input"
          type="email"
          :placeholder="user.email"
          required
        />

        <input
          v-model="password"
          class="form-input"
          type="password"
          placeholder="Enter your password"
          required
        />

        <div class="flex w-full space-x-2 mt-3">
          <button
            @click="handleSubmit"
            class="button bg-purple w-full"
            type="submit"
          >
            Update information
          </button>

          <button @click="handleDelete" class="button bg-red-500 w-full">
            Delete Account
          </button>
        </div>
      </form>
    </div>
    <router-view />
  </Layout>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
import Layout from '@/components/Layout.vue'
import { mapGetters, mapActions } from 'vuex'
import LoadingSpinner from '@/components/LoadingSpinner'
export default {
  name: 'Account',
  components: {
    Layout,
    LoadingSpinner
  },
  data() {
    return {
      email: '',
      password: '',
      loading: true
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchUser')
    this.$store.commit('simulator/setBuyingPower', this.user.buyingPower)
    this.loading = false
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      try {
        const payload = {
          id: this.user._id,
          data: {
            email: this.email,
            password: this.password
          }
        }
        await this.$store.dispatch('updateUser', payload)
      } catch (e) {
        console.warn(e)
      }
      // console.log('form: ', this.email, this.password)
      // console.log('update clicked')
    },
    async handleDelete(e) {
      e.preventDefault()
      try {
        await this.$store.dispatch('deleteUser', this.user._id)
        this.$router.push({ name: 'Index' })
      } catch (e) {
        console.warn(e)
      }
      console.log('delete clicked')
    }
  }
}
</script>

test@gmail.com
