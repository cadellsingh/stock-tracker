<template>
  <div class="border-4 border-white shadow-xl bg-gray-50 rounded-lg p-8 mt-10">
    <p class="font-bold text-xl mb-5">News</p>
    <div class="grid grid-cols-2 gap-5">
      <div v-for="(el, index) in news" :key="index" class="cursor-pointer hover:bg-gray-100">
        <a :href="el.link" target="_blank">
          <div class="grid-item">
            <p>{{el.title}}</p>
            <p>{{el.date}}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockNews',
  props: {
    news: Array
  },
}
</script>

<style scoped>
.grid-item {
  @apply border border-purple p-5 rounded;
}

.grid-item p {
  @apply truncate 2xl:text-lg;
}

.grid-item p:nth-child(2n) {
  @apply 2xl:text-xl text-lg text-purple font-bold;
}
</style>
