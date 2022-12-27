<template>
    <!-- <q-card-section class="q-pa-none q-px-sm q-pt-xs" v-for="item in 12" :key="item">
        <q-skeleton type="QBtn" />
    </q-card-section> -->
    <q-scroll-area class="fit">
        {{ listadoModulos.length > 0 ? '' : 'Cargando...' }}
        <q-list class="text-grey-7 q-pt-sm" v-for="a in listadoModulos" :key="a.title">
            <q-expansion-item expand-separator :icon="a.modulo.icon" :label="a.modulo.nombre">
                <q-item clickable v-for="(item, index) in a.user_submodulos" :key="index"
                    :to="`/panel-usuario/${item.submodulo.slug}`" v-ripple :inset-level="2" v-bind="item"
                    class="GPL__drawer-item" style="padding-left: 70px !important">
                    <q-item-section>{{ item.submodulo.nombre }}</q-item-section>
                </q-item>
            </q-expansion-item>
        </q-list>
    </q-scroll-area>
</template>
<script>
import { onMounted, ref, computed } from 'vue'
import { getUserModulo } from '../services/userModuloServices'
import { useUserStore } from '../stores/userStore'
export default {
    setup() {
        const storeUser = useUserStore()
        const link = ref([
            { icon: 'home', text: 'Home', path: '/dashboard' },
            { icon: 'whatshot', text: 'Control Equipo', path: '/dashboard/controlequipo', label: '' }
        ])

        const listadoModulos = computed(() => storeUser.userModulos)

        const modulos = async () => {
            await getUserModulo()
        }

        onMounted(() => {
            modulos()
        })

        const modelos = (index) => {
            modulsActive.value.indexOf(index) === -1 ?
                modulsActive.value.push(index) : modulsActive.value.splice(modulsActive.value.indexOf(index), 1);
        }

        const probar = (sub) => {
            showg.value.indexOf(sub) === -1 ?
                showg.value.push(sub) : showg.value.splice(showg.value.indexOf(sub), 1);
        }

        return {
            listadoModulos,
            link
        }
    }
}
</script>
<style>
.q-item__section--avatar {
    color: inherit;
    min-width: 0px;
}

.q-skeleton--type-QBtn {
    width: 100%;
    height: 36px;
}
</style>
