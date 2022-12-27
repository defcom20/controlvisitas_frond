import { useEndPoint } from './api'
import { Notify } from 'quasar'
import { useErrorGlobalStore } from '../stores/errorGlobalStore'

const storeError = useErrorGlobalStore();

const guardarUsuario = async (payload) => {
  try {
    const res = {
      "nombre": payload.nombre,
      "usuario": payload.usuario,
      "password": payload.password,
      "sede_id": payload.sede_id.id,
      "tipo_role_id": payload.tipo_role_id.id,
      "tipo_estado_id": payload.tipo_estado_id.id
    }
    const { response } = await useEndPoint({ method: 'POST', endpoint: 'api/register', body: res, type: 'gpwith' })
    if (response.success) {
      Notify.create({
        position: 'top-right',
        type: 'positive',
        timeout: 3000,
        message: 'Usuario guardado con Éxito.'
      })
    } else {
      storeError.handleErrorGlobal(response)
    }
    return response
  } catch (e) {
    storeError.handleErrorGlobal(e)
  }
}

const actualizarUser = async (payload, id) => {
  try {
    const dataRes = {
      "nombre": payload.nombre,
      "usuario": payload.usuario,
      "password": payload.password,
      "sede_id": payload.sede_id.id,
      "tipo_role_id": payload.tipo_role_id.id,
      "tipo_estado_id": payload.tipo_estado_id.id
    }
    const path = `api/user/${id}`

    const { response } = await useEndPoint({ method: 'PUT', endpoint: path, body: dataRes, type: 'gpwith' })
    if (response.success) {
      Notify.create({
        position: 'top-right',
        type: 'positive',
        timeout: 3000,
        message: 'Datos actualizado con Éxito.'
      })
    } else {
      storeError.handleErrorGlobal(response)
    }
    return response
  } catch (e) {
    storeError.handleErrorGlobal(e)
  }

}

const getDataUser = async (payload) => {
  try {
    const path = `api/user/${payload}`
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

export {
  guardarUsuario,
  getDataUser,
  actualizarUser
}
