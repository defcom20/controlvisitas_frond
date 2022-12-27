import { Notify } from 'quasar'
import { useEndPoint } from './api'
//import { useUserStore } from '../stores/userStore'
import { useErrorGlobalStore } from '../stores/errorGlobalStore'

//const store = useUserStore();
const storeError = useErrorGlobalStore();

const marcarSalida = async (payload) => {
  try {
    const path = `api/marcar/${payload}`
    const { response } = await useEndPoint({ method: 'GET', endpoint: path, type: 'gParam' })
    if (response.success) {
      Notify.create({
        position: 'top-right',
        type: 'positive',
        timeout: 3000,
        message: 'Marco hora salida con Éxito.'
      })
    } else {
      storeError.handleErrorGlobal(response)
    }
    return response
  } catch (e) {
    storeError.handleErrorGlobal(e)
  }
}
const getDataVisita = async (payload) => {
  try {
    const path = `api/visitante/${payload}`
    const { response } = await useEndPoint({ method: 'GET', endpoint: path, type: 'gParam' })
    if (response.success) {
      console.log("🚀 ~ file: visitasServices.js:33 ~ getDataVisita ~ response", response)
    } else {
      storeError.handleErrorGlobal(response)
    }
    return response
  } catch (e) {
    storeError.handleErrorGlobal(e)
  }
}

const guardarVisitante = async (payload) => {
  try {
    const dataRes = {
      "nombre": payload.nombre,
      "dni": payload.dni,
      "motivo": payload.motivo,
      "lugar": payload.lugar,
      "area_id": payload.area_id.id,
      "tipo_estado_id": payload.tipo_estado_id.id
    }
    const { response } = await useEndPoint({ method: 'POST', endpoint: 'api/visitante', body: dataRes, type: 'gpwith' })
    if (response.success) {
      Notify.create({
        position: 'top-right',
        type: 'positive',
        timeout: 3000,
        message: 'Marco hora Ingreso con Éxito.'
      })
    } else {
      storeError.handleErrorGlobal(response)
    }
    return response
  } catch (e) {
    storeError.handleErrorGlobal(e)
  }
}
const actualizarVisitante = async (payload, id) => {
  try {
    const dataRes = {
      "nombre": payload.nombre,
      "dni": payload.dni,
      "motivo": payload.motivo,
      "lugar": payload.lugar,
      "area_id": payload.area_id.id,
      "tipo_estado_id": payload.tipo_estado_id.id
    }
    const path = `api/visitante/${id}`

    const { response } = await useEndPoint({ method: 'PUT', endpoint: path, body: dataRes, type: 'gpwith' })
    if (response.success) {
      Notify.create({
        position: 'top-right',
        type: 'positive',
        timeout: 3000,
        message: 'Marco hora Ingreso con Éxito.'
      })
    } else {
      storeError.handleErrorGlobal(response)
    }
    return response
  } catch (e) {
    storeError.handleErrorGlobal(e)
  }

}

const eliminarVisitante = async (url,id) => {
  try {

    const path = `api/${url}/${id}`

    const { response } = await useEndPoint({ method: 'DELETE', endpoint: path, type: 'gpwith' })
    if (response.success) {
      Notify.create({
        position: 'top-right',
        type: 'positive',
        timeout: 3000,
        message: 'Eliminado con Éxito.'
      })
    } else {
      storeError.handleErrorGlobal(response)
    }
    return response
  } catch (e) {
    storeError.handleErrorGlobal(e)
  }


}

export {
  marcarSalida,
  guardarVisitante,
  actualizarVisitante,
  getDataVisita,
  eliminarVisitante
}
