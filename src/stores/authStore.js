import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { useErrorGlobalStore } from './errorGlobalStore'
// import { useEndPoint } from '../services/api'


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
    async getUser () {
      const storeError = useErrorGlobalStore();
      try {
        if (!this.data) {
          const { response } = await useEndPoint({ method: 'GET', endpoint: 'api/user-auth', type: 'gpNot' })
          if (response) {
            this.data = response.data
          } else {
            storeError.handleErrorGlobal(response)
          }
          return response
        }
      } catch (e) {
        storeError.handleErrorGlobal(e)
      }
    },
    logout() {
      this.data = ""
    },
  }
})
