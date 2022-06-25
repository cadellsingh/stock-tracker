<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: 'App',
  created() {
    AOS.init()
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  @apply bg-bgColor;
}

.error {
  @apply text-red-700 font-semibold
}

.button {
  @apply text-white
          font-bold
          p-2
          rounded
          cursor-pointer;
}

.form-input {
  @apply bg-gray-100 shadow appearance-none border rounded w-full p-3 mt-2 leading-tight focus:outline-none focus:bg-white;
}
</style>
