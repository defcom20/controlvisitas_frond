import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userProyecto: [],
        userModulos: []
    }),
    getters: {
        nombreProyectoAcual: (state) => {
            const store = useAuthStore()
            if (store.data.user) {
                const nameproyect = state.userProyecto.filter((item) => {
                    return item.id === store.data.user.proyecto ? item : ''
                })
                return nameproyect.length > 0 ? nameproyect[0].proyecto.compania : "90"
            } else {
                return "90"
            }
        }
    },
    actions: {
        getUserProyectos(payload) {
            this.userProyecto = []
            if (payload.data.length > 0) {
                this.userProyecto = payload.data
            }
        },
        getUserModulos(payload) {
            this.userModulos = []
            this.userProyecto = []
            if (payload.success) {
                this.userModulos = payload.data.resModulo
                this.userProyecto = payload.data.resProyecto
            }
        },
        updateUser(payload) {
            const storeAuth = useAuthStore()
            storeAuth.data = payload.data
        }
    },
})
