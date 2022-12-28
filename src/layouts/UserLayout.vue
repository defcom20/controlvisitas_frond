<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Control visita
        </q-toolbar-title>

        <q-btn color="red" text-color="white" size="sm" label="Cerrar Sesión" @click="cerrar()" />
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from "vue-router";
import EssentialLink from 'components/EssentialLink.vue'
import { logout } from '../services/authServices'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const router = useRouter();
    const leftDrawerOpen = ref(false)

    const cerrar = async () => {
      const res = await logout()
      if (res.success) {
        router.push("/")
      }
    }

    return {
      cerrar,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
