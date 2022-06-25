<template>
  <Modal>
    <div
      class="border-4 border-white rounded-lg shadow-xl p-5 max-w-lg mx-auto"
      data-aos="fade-in"
      data-aos-easing="ease-in-out"
      data-aos-duration="500"
    >
      <div>
        <p class="text-4xl text-purple font-bold">Sign in</p>
      </div>
      <p v-if="error" class="font-bold text-red-500">{{ error }}</p>

      <form @submit="handleSubmit" class="mt-5">
        <input
          v-model="email"
          class="form-input"
          type="email"
          placeholder="Enter your email"
          required
        />

        <input
          v-model="password"
          class="form-input"
          type="password"
          placeholder="Enter your password"
          required
        />

        <div class="grid grid-cols-2 gap-x-3 mt-4">
          <button
            type="button"
            class="button bg-gray-500"
            @click="$emit('cancel')"
          >
            Cancel
          </button>
          <button class="w-full button bg-purple" type="submit">Sign in</button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
import Modal from '../components/Modal.vue'

export default {
  name: 'SignIn',
  components: {
    Modal
  },
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      this.error = null

      try {
        const payload = {
          email: this.email,
          password: this.password
        }
        await this.$store.dispatch('login', payload).then((res) => {
          this.$router.push({ name: 'Account' })
        })
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.data
        }

        console.log('this. error: ', this.error)
      }
    }
  }
}
</script>
