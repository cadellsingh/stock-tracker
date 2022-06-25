/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */

import axios from 'axios'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    watchlist: []
  },
  getters: {
    watchlist: (s) => s.watchlist
  },
  mutations: {
    setWatchlist(state, data) {
      state.watchlist = data
    },
    setAlertPrice(state, payload) {
      const { id, data } = payload
      const index = state.watchlist.findIndex((el) => el._id === id)
      if (index !== -1) {
        const updatedStock = {
          ...state.watchlist[index],
          alertPrice: data.alertPrice
        }
        Vue.set(state.watchlist, index, updatedStock)
      }
    },
    deleteStock(state, id) {
      state.watchlist = state.watchlist.filter((el) => el._id !== id)
    }
  },
  actions: {
    async fetchWatchlist({ commit, dispatch }) {
      try {
        let res = null
        const url = 'http://localhost:6502/api/watchlist/allStocks'
        const response = await axios.get(url)
        if (response.status === 200) {
          res = response.data.data
          const updatedWatchlist = await dispatch('fetchAllStockPrices', res)
          commit('setWatchlist', updatedWatchlist)
        }
        return res
      } catch (e) {
        console.warn(e)
        throw e
      }
    },
    async fetchStockPrices({ commit }, ticker) {
      try {
        let res = null
        const url = `http://localhost:6502/api/stock/${ticker}/prices`
        const response = await axios.get(url)
        if (response.status === 200) {
          res = response.data.data
        }
        return res
      } catch (e) {
        console.warn(e)
        throw e
      }
    },
    async fetchAllStockPrices({ commit, dispatch }, watchlist) {
      const promises = watchlist.map((el) => {
        return dispatch('fetchStockPrices', el.stockTicker)
      })

      const results = await Promise.allSettled(promises)

      return results
        .map((el, index) => {
          if (el.status === 'fulfilled') {
            return {
              ...watchlist[index],
              ...el.value
            }
          }
        })
        .filter((el) => el)
    },
    async fetchStockNews({ commit }, ticker) {
      try {
        let res = null
        const url = `http://localhost:6502/api/stock/${ticker}/news`
        const response = await axios.get(url)
        if (response.status === 200) {
          res = response.data.data
        }
        return res
      } catch (e) {
        console.warn(e)
        throw e
      }
    },
    async addStock({ commit }, payload) {
      try {
        let res = null
        const url = 'http://localhost:6502/api/watchlist/addStock'
        const response = await axios.post(url, payload)
        if (response.status === 200) {
          res = response.data.data
        }
        return res
      } catch (e) {
        console.warn(e)
      }
    },
    async setAlertPrice({ commit }, payload) {
      try {
        const { id, data } = payload
        const url = `http://localhost:6502/api/watchlist/${id}/update`
        const response = await axios.patch(url, data)
        if (response.status === 200) {
          commit('setAlertPrice', payload)
        }
      } catch (e) {
        throw e
      }
    },
    async deleteStock({ commit }, id) {
      try {
        const url = `http://localhost:6502/api/watchlist/${id}/delete`
        const response = await axios.delete(url)
        if (response.status === 200) {
          commit('deleteStock', id)
        }
      } catch (e) {
        throw e
      }
    }
  }
}
