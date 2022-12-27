import { Notify } from 'quasar'
import { useEndPoint } from './api'
import { useAuthStore } from '../stores/authStore'
import { useErrorGlobalStore } from '../stores/errorGlobalStore'

const store = useAuthStore();
const storeError = useErrorGlobalStore();

const login = async (payload) => {
    try {
        const { response } = await useEndPoint({ method: 'POST', endpoint: 'api/login', body: payload })
        if (response.data) {
            store.login(response)
            Notify.create({
                position: 'top-right',
                type: 'positive',
                timeout: 3000,
                message: 'Bienvenido ' + response.data.user.usuario
            })
        } else {
            storeError.handleErrorGlobal(response)
        }
        return response
    } catch (e) {
        storeError.handleErrorGlobal(e)
    }
}
const logout = async () => {
    try {
        const { response } = await useEndPoint({ method: 'POST', endpoint: 'api/logout', type: 'gpNot' })
        if (response.success) {
            store.logout(response)
            Notify.create({
                position: 'top-right',
                type: 'positive',
                timeout: 4000,
                message: response.message
            })
        } else {
            storeError.handleErrorGlobal(response)
        }
        return response
    } catch (e) {
        storeError.handleErrorGlobal(e)
    }
}
const getUserId = async (payload) => {
    try {
        if (!store.data) {
            const path = `api/user?order_column=created_at&order_direction=desc&filter_match=and&limit=5&page=1&ref=6`
            const { response } = await useEndPoint({ method: 'GET', endpoint: path, body: payload, type: 'gParam' })
            if (response.data) {
                store.user(response)
            } else {
                storeError.handleErrorGlobal(response)
            }
            return response
        }
    } catch (e) {
        storeError.handleErrorGlobal(e)
    }
}
const getUser = async (payload) => {
    try {
        if (!store.data) {
            const { response } = await useEndPoint({ method: 'GET', endpoint: 'api/user-auth', type: 'gpNot' })
            if (response) {
                store.user(response)
            } else {
                storeError.handleErrorGlobal(response)
            }
            return response
        }
    } catch (e) {
        storeError.handleErrorGlobal(e)
    }
}

export { login, logout, getUserId, getUser }
