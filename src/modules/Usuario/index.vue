<template>
  <q-page class="flex-inline flex-center">
    <ButtonOption :options="filterable.orderables" :check_select="check_select" />
    <div class="q-pa-md">
      <Filterable v-bind="filterable" v-slot="{ item }">
        <tr class="text-center cursor-pointer"
          :class="[check_select.includes(item.id) ? 'bg-pink-1 text-pink-8' : 'bg-white text-grey-7']"
          @click="check(item.id)">
          <td class="border" :hidden="filterable.orderables[0].hidden">
            <q-checkbox v-model="check_select" :val="item.id" size="xs" checked="true" />
          </td>
          <td class="border" :hidden="filterable.orderables[1].hidden"> {{ item.nombre }} </td>
          <td class="border" :hidden="filterable.orderables[2].hidden"> {{ item.usuario || '-' }} </td>
          <td class="border" :hidden="filterable.orderables[3].hidden"> {{ item.user_sede.sede.nombre }} </td>

          <td class="border" :hidden="filterable.orderables[4].hidden"> {{ item.tipo_role.nombre }} </td>

          <td class="border" :hidden="filterable.orderables[5].hidden">
            <q-badge outline :color="item.tipo_estado.id === 1 ? 'green' : 'red'" :label="item.tipo_estado.nombre" />
          </td>

        </tr>
      </Filterable>
    </div>
  </q-page>
</template>

<script>
import { computed, inject } from "vue";
import { useRouter } from "vue-router";
import Filterable from "./partial/Filterable.vue";
import visitas from './composables/visitas';
import ButtonOption from '../../common/ButtonOption.vue';
import { marcarSalida } from '../../services/visitasServices'

export default {
  components: {
    Filterable,
    ButtonOption,
  },
  setup() {
    const router = useRouter();
    const emitter = inject("emitter");
    const pathActual = computed(() => router.currentRoute.value.meta.resource);
    const { check_select, filterable, check } = visitas('usuario')

    const handleSalida = async (id) => {
      await marcarSalida(id)
      emitter.emit("updateTableNormal", true);
      check_select.value = []
    }

    return {
      pathActual,
      check_select,
      filterable,
      check,
      handleSalida
    };
  },
};
</script>


