/*eslint no-useless-catch: "error"*/
/* eslint-disable */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import watchlist from './modules/watchlist'
import simulator from './modules/simulator'
import misc from './modules/misc'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    watchlist,
    simulator,
    misc
  },
  state: {
    user: null,
    userToken: null
  },
  getters: {
    user: (s) => s.user,
    userToken: (s) => s.userToken
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    },
    setUserToken(state, data) {
      state.userToken = data
    },
    logout(state) {
      state.user = null
      state.userToken = null
    }
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const url = 'http://localhost:6502/api/user/get'
        const response = await axios.get(url)
        if (response.status === 200) {
          commit('setUser', response.data.data)
        }
      } catch (e) {
        throw e
      }
    },
    async updateUser({ commit }, payload) {
      try {
        const { id, data } = payload
        const url = `http://localhost:6502/api/user/${id}`
        const response = await axios.patch(url, data)
        if (response.status === 200) {
          commit('setUser', data)
        }
      } catch (e) {
        console.warn(e)
      }
    },
    async deleteUser({ commit }, id) {
      try {
        const url = `http://localhost:6502/api/user/${id}`
        const response = await axios.delete(url)
      } catch (e) {
        console.warn(e)
      }
    },
    async login(context, data) {
      try {
        let url = 'http://localhost:6502/api/user/login'
        let res = null
        await axios.post(url, data).then((response) => {
          const user = response.data
          this._vm.$storageService.setItem('token', JSON.stringify(user))
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + user.token
          context.commit('setUser', user)
          // resolve(user)
        })
      } catch (e) {
        throw e
      }
      // return new Promise((resolve, reject) => {
      //   let url = 'http://localhost:6502/api/user/login'
      //   let res = null
      //   axios
      //     .post(url, data)
      //     .then((response) => {
      //       const user = response.data
      //       console.log('user log in: ', user)
      //       this._vm.$storageService.setItem('token', JSON.stringify(user))
      //       axios.defaults.headers.common['Authorization'] =
      //         'Bearer ' + user.token
      //       context.commit('setUser', user)
      //       resolve(user)
      //     })
      //     .catch((e) => {
      //       // console.warn(e)
      //       // reject(e)
      //       throw e
      //     })
      // })
    },
    async signUp(context, data) {
      console.log('data: ', data)
      try {
        let url = 'http://localhost:6502/api/user/register'
        let user = null
        const response = await axios.post(url, data)
        if (response.status === 200) {
          user = response.data
          this._vm.$storageService.setItem('token', JSON.stringify(user))
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + user.token
          context.commit('setUser', user)
        }
        return user
      } catch (e) {
        throw e
      }
    }
  }
})
