<template>
  <Modal>
    <div
      class="p-10"
      data-aos="fade-in"
      data-aos-easing="ease-in-out"
      data-aos-duration="500"
    >
      <form @submit="handleSubmit">
        <div>
          <label class="my-auto" for="stocks">Choose one of your stocks</label>
          <select
            class="border rounded shadow w-full p-3 mb-5 mt-2 focus:outline-none focus:bg-white"
            v-model="form.stockId"
            required
          >
            <option class="bg-gray-100" disabled value="">Select stock</option>
            <option v-for="(item, key) in stocks" :value="item.id" :key="key">
              {{item.ticker}}
            </option>
          </select>
        </div>

        <div>
          <label>Alert price </label>
          <input
            class="form-input"
            type="number"
            placeholder="Price"
            v-model="form.alertPrice"
            required
          />
        </div>

        <!-- would you like to place a market order when / if it reaches this price -->
        <!-- <p>{{ displayTransaction }}</p> -->

        <div class="flex text-center space-x-2">
          <button class="w-full button bg-purple mt-5" type="submit">
            Submit request
          </button>
          <p class="w-full button bg-gray-200 mt-5 text-black" @click="handleCancel">
            Cancel
          </p>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
  name: 'NotificationForm',
  components: {
    Modal
  },
  data() {
    return {
      form: {
        stockId: '',
        alertPrice: '',
      },
    }
  },

  computed: {
    displayTransaction() {
      return !(this.form.stockId === '' || this.form.alertPrice === '')
    },
    stocks() {
      const watchlist = this.$store.getters['watchlist/watchlist']
      return watchlist.map(el => {
        return {
          id: el._id,
          ticker: el.stockTicker,
        }
      })
    }
  },

  methods: {
    async handleSubmit(e) {
      e.preventDefault()

      const payload = {
        id: this.form.stockId,
        data: {
          alertPrice: this.form.alertPrice
        }
      }

      await this.$store.dispatch('watchlist/setAlertPrice', payload)

      this.$emit('closeForm')
    },
    handleCancel() {
      this.$emit('cancel')
    }
  },
}
</script>

<style scoped>
select {
  background-color: #f5f5f5;
}
</style>
