import { useEndPoint } from './api'
import { useErrorGlobalStore } from '../stores/errorGlobalStore'

const storeError = useErrorGlobalStore();

const getDataTable = async (path, data) => {

  const str = '?' + Object.keys(data).map(key => {
    return `${key}=${encodeURIComponent(data[key])}`;
  }).join('&');
  const pp = path + str
  try {
    const { response } = await useEndPoint({ method: 'GET', endpoint: pp, type: 'gpNot' })
    return response
  } catch (e) {
    storeError.handleErrorGlobal(e)
  }
}
export {
  getDataTable
}
