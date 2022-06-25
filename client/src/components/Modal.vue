<template>
  <div
    class="fixed inset-0 bg-opacity-50 overflow-y-auto h-screen w-full px-5 z-10"
  >
    <div
      class="relative top-24 mx-auto border md:max-w-lg max-w-md shadow-lg rounded-md bg-white"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
}
</script>
