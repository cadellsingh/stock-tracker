<template>
  <div class="overflow-hidden opacity-75 flex flex-col items-center justify-center">
    <div class="loader border-purple ease-linear rounded-full border-t-4 h-12 w-12 mb-4"></div>
    <p v-if="message" class="text-center text-black text-base capitalize">{{ message }} ...</p>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    message: String,
  },
};
</script>

<style scoped>
.loader {
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
