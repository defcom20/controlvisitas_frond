import { defineStore } from 'pinia'

export const useMaestroStore = defineStore('maestroStore', {
  state: () => ({
    Area: []
  }),
  actions: {
    setMaestro(payload) {
      // payload.forEach( (item) => {
      //   console.log("🚀 ~ file: maestroStore.js:13 ~ payload.data.forEach ~ item", item)
      //   //this.listado.area.push({ label: item.nombre, value: item.id })
      // })


    }
  }
})
