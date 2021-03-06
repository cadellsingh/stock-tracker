/* eslint-disable no-unused-vars */

import { TOTAL_BUYING_POWER } from '@/utils/constants'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    simulatedStocks: [],
    buyingPower: TOTAL_BUYING_POWER
  },
  getters: {
    simulatedStocks: (s) => s.simulatedStocks,
    buyingPower: (s) => s.buyingPower
  },
  mutations: {
    setSimulatedStocks(state, data) {
      state.simulatedStocks = data
    },
    setBuyingPower(state, data) {
      state.buyingPower = data
    },
    modifyBuyingPower(state, data) {
      console.log('buying power: ', data)
      if (data.action === 'buy') {
        state.buyingPower -= data.marketPrice
      } else {
        state.buyingPower += data.marketPrice
      }
    },
    deleteStock(state, id) {
      state.simulatedStocks = state.simulatedStocks.filter(
        (el) => el._id !== id
      )
    }
  },
  actions: {
    async fetchSimulatedStocks({ commit }) {
      try {
        let res = null
        const url = 'http://localhost:6502/api/simulation/allStocks'
        const response = await axios.get(url)
        if (response.status === 200) {
          res = response.data.data
          commit('setSimulatedStocks', res)
        }
        return res
      } catch (e) {
        console.warn(e)
        throw e
      }
    },
    async modifyBuyingPower({ commit }, payload) {
      commit('modifyBuyingPower', payload)
    },
    async addStock({ commit }, payload) {
      console.log('payload: ', payload)
      try {
        let res = null
        const url = 'http://localhost:6502/api/simulation/addStock'
        const response = await axios.post(url, payload)
        if (response.status === 200) {
          res = response.data
        }
        return res
      } catch (e) {
        console.warn(e)
        throw e
      }
    },
    async closePosition({ commit }, id) {
      console.log(id)
      try {
        const url = `http://localhost:6502/api/simulation/${id}/delete`
        const response = await axios.delete(url)
        if (response.status === 200) {
          commit('deleteStock', id)
        }
      } catch (e) {
        console.warn(e)
      }
    }
  }
}
