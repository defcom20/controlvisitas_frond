import { defineStore } from 'pinia'
import { Cookies } from 'quasar'


export const useAuthStore = defineStore('authStore', {
  state: () => ({
    data: ""
  }),
  getters: {
    getIdProyecto: (state) => {
      return state.data ? state.data.user.proyecto : ""
    }
  },
  actions: {
    login(payload) {
      this.data = payload.data
      Cookies.set('User', payload.data.user.usuario)
      Cookies.set('Token', payload.data.token)
    },
    user(payload) {
      this.data = payload.data
      //Cookies.set('User', payload.user.usuario)
    },
    logout() {
      this.data = ""
    },
  }
})
