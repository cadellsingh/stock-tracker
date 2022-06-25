<template>
  <p class="font-bold text-red-500">
    {{ message }}
  </p>
</template>

<script>
export default {
  name: 'FormError',

  props: {
    message: String,
  },
}
</script>
