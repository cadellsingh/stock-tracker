<template>
  <Layout class="py-5">
    <div>
      <h1 class="text-4xl text-purple mt-5 font-bold mb-10">StockTracker</h1>
    </div>

    <div
      class="grid grid-cols-2 border-4 border-white bg-gray-50 rounded-lg shadow-xl p-5"
    >
      <div class="p-10 my-auto">
        <p class="text-2xl font-bold tracking-wide">
          Get started with
          <span class="text-purple text-3xl font-extrabold">StockTracker</span>
          today!
        </p>
        <p class="my-5 text-xl">
          A simple and smart tool to help you get the most out of your stocks.
        </p>
        <div class="space-x-5 flex sign">
          <p @click="display('signUp')">Sign up</p>
          <p @click="display('signIn')">Sign in</p>
        </div>
      </div>
      <div>
        <img
          src="../assets/images/finance1.svg"
          alt="finance image"
          class="mx-auto"
        />
      </div>
    </div>

    <transition-group name="fade">
      <SignUp v-if="signUp" @cancel="closePopup" key="signUp" />
      <SignIn v-if="signIn" @cancel="closePopup" key="signIn" />
    </transition-group>

    <div class="mt-10">
      <Features />
    </div>
  </Layout>
</template>

<script>
import SignUp from '@/components/SignUp.vue'
import SignIn from '@/components/SignIn.vue'
import Layout from '@/components/Layout.vue'
import Features from '@/components/Features.vue'

export default {
  name: 'LandingPage',

  data() {
    return {
      signUp: false,
      signIn: false,
    }
  },

  components: {
    Layout,
    Features,
    SignUp,
    SignIn,
  },

  methods: {
    display(form) {
      if (form === 'signUp') {
        // TODO refactor
        this.signUp = true
        this.signIn = false
      } else {
        this.signUp = false
        this.signIn = true
      }
    },

    closePopup() {
      this.signUp = false
      this.signIn = false
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

img {
  height: 100%;
}

.sign p {
  @apply py-2 px-10 border border-white rounded-md shadow-lg hover:bg-purple hover:text-white cursor-pointer;
}
</style>
