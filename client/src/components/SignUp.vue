<template>
  <Modal>
    <div
      class="border-4 border-white rounded-lg shadow-xl p-5 max-w-lg mx-auto"
      data-aos="fade-in"
      data-aos-easing="ease-in-out"
      data-aos-duration="500"
    >
      <div>
        <p class="text-4xl text-purple font-bold">Sign up</p>
      </div>
      <p v-if="error" class="font-bold text-red-500">{{error}}</p>
      <form @submit="handleSubmit" class="mt-5">
        <input
          class="form-input"
          type="email"
          placeholder="Enter your email"
          v-model="form.email"
          required
        />

        <input
          class="form-input"
          type="password"
          placeholder="Enter your password"
          v-model="form.password"
          required
        />

        <div class="grid grid-cols-2 gap-x-3 mt-4">
          <button
            type="button"
            class="button bg-gray-400"
            @click="$emit('cancel')"
          >
            Cancel
          </button>
          <button class="button bg-purple" type="submit">Sign up</button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */

import Modal from '@/components/Modal.vue'

export default {
  name: 'SignUp',
  components: {
    Modal,
  },
  data() {
    return {
      form: {
        email: '',
        username: '',
        password: null,
      },
    error: null,
    }
  },
  computed: {
    formError() {
      return this.confirmingPassword
    },
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()

      try {
        const payload = {
          email: this.form.email,
          password: this.form.password
        }
        const response = await this.$store.dispatch('signUp', payload)
        if (response) {
          this.$router.push({ name: 'Account' })
        }
      } catch (e) {
        this.error = e.response.data.error
        console.log(e.response);
      }

    },
  },
}
</script>

<style scoped></style>