<template>
  <div
    class="col-span-2 border-4 border-white p-8 shadow-xl bg-gray-50 rounded-lg"
  >
    <p class="font-bold text-xl mb-5">Statistics Overview</p>
    <div class="grid grid-cols-2 gap-3">
      <div class="grid-item">
        <p>Adjusted Close</p>
        <p>{{prices.adjClose}}</p>
      </div>
      <div class="grid-item">
        <p>Adjusted High</p>
        <p>{{prices.adjHigh}}</p>
      </div>
      <div class="grid-item">
        <p>Adjusted Open</p>
        <p>{{prices.adjOpen}}</p>
      </div>
      <div class="grid-item">
        <p>Adjusted Volume</p>
        <p>{{prices.adjVolume}}</p>
      </div>
      <div class="grid-item">
        <p>Close</p>
        <p>{{prices.close}}</p>
      </div>
      <div class="grid-item">
        <p>High</p>
        <p>{{prices.high}}</p>
      </div>
      <div class="grid-item">
        <p>Low</p>
        <p>{{prices.low}}</p>
      </div>
      <div class="grid-item">
        <p>Open</p>
        <p>{{prices.open}}</p>
      </div>
      <div class="grid-item">
        <p>Volume</p>
        <p>{{prices.volume}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticsOverview',
  props: {
    prices: Object
  }
}
</script>

<style scoped>
.grid-item {
  @apply flex justify-between border border-purple rounded p-5;
}

.grid-item p:nth-child(2n) {
  @apply text-purple font-bold;
}
</style>
