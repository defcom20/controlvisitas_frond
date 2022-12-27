import { defineStore } from 'pinia'
import { Loading, QSpinnerGears, Notify } from 'quasar'


export const useErrorGlobalStore = defineStore('errorGlobal', {
    state: () => ({
        error: []
    }),
    actions: {
        handleErrorGlobal(payload) {

            this.error.push(payload)
            Notify.create({
                type: 'negative',
                message: payload.message
            })
            // Swal.fire({
            //     toast: true,
            //     position: 'top-end',
            //     showConfirmButton: false,
            //     timer: 3000,
            //     icon: 'error',
            //     title: payload.message
            // })
        }
    },

})
