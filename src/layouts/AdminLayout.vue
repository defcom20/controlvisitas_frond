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

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />

      </q-list>
    </q-drawer>

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

const linksList = [
  {
    title: 'Usuario',
    icon: 'school',
    path: '/panel-admin/usuario'
  },
  {
    title: 'Visitas',
    icon: 'code',
    path: '/panel-admin/visitas'
  }
]

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
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
