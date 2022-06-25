<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
import Navbar from '../components/Navbar.vue'

export default {
  name: 'User',
  components: {
    Navbar,
  },
}
</script>