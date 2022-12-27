import { useEndPoint } from './api'
import { useErrorGlobalStore } from '../stores/errorGlobalStore'
import { useMaestroStore } from '../stores/maestroStore'

const storeError = useErrorGlobalStore();

const getAreas = async () => {
  try {
    const { response } = await useEndPoint({ method: 'GET', endpoint: 'api/area', type: 'gpNot' })
    return response.data
  } catch (e) {
    storeError.handleErrorGlobal(e)
  }
}
const getSede = async () => {
  try {
    const { response } = await useEndPoint({ method: 'GET', endpoint: 'api/sede', type: 'gpNot' })
    return response.data
  } catch (e) {
    storeError.handleErrorGlobal(e)
  }
}

export {
  getAreas,
  getSede
}
