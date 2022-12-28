<template>
  <div class="row q-pa-sm">
    <div class="col-12 col-md-3 text-left text-caption">
      <q-breadcrumbs class="text-grey" active-color="primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" class="cursor-pointer" to="/panel-usuario/home" />
        <q-breadcrumbs-el :label="`${route.meta.mode}`" icon="navigation" />
      </q-breadcrumbs>
    </div>
    <div class="col-12 col-md-9 text-right">
      <q-btn size="sm" @click="showFrom('create')" color="light-blue-10" icon="mdi-plus" label="Nuevo"
        class="q-mx-sm no-border dashed bg-white" outline />
      <template style="display: none" v-if="check_select.length > 0">
        <q-btn size="sm" @click="showFrom(`update/${check_select}`)" push color="white" icon="mdi-pencil"
          text-color="green" class="q-mx-sm" label="editar" />
        <q-btn size="sm" @click="showFrom(`show/${check_select}`)" push color="white" icon="mdi-eye" text-color="blue"
          class="q-mx-sm" label="ver" />
        <q-btn size="sm" push color="white" icon="mdi-delete" text-color="red" class="q-mx-sm" label="eliminar"
          @click="eliminar(check_select)" />
      </template>
      <q-btn size="sm" color="green" icon="mdi-filter-outline" label="Filtrar" class="q-mx-sm no-border" outline
        @click="showModalFilter()" />
      <!-- <q-icon size="sm" color="green" name="mdi-microsoft-excel cursor-pointer" class="q-mx-sm" @click="exportExcel()">
        <q-tooltip class="bg-gray">Exportar Excel</q-tooltip>
      </q-icon> -->
      <q-icon size="sm" color="blue" name="mdi-refresh" class="q-mx-sm cursor-pointer" @click="updateTable()">
        <q-tooltip class="bg-gray">Actualizar Tabla</q-tooltip>
      </q-icon>
      <q-btn-dropdown size="sm" class="btn-config q-mx-sm" color="purple-10" push glossy dropdown-icon="mdi-dots-grid">
        <q-list>
          <q-item v-close-popup>
            <q-item-section>
              <q-item-label v-for="(item, index) in options" :key="index">
                <q-checkbox v-model="group" :val="item.column" :label="item.label" color="cyan-10"
                  :checked="!item.hidden" @click="columnTable(item.column)" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
  </div>
</template>
<script>
import { inject } from "vue";
import { Dialog } from 'quasar'
import viewTable from "../composables/configColum";
import { useRouter, useRoute } from "vue-router";
import { eliminarVisitante } from '../services/visitasServices'

export default {
  props: ["options", "isBottonActive", "check_select"],
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const emitter = inject("emitter");
    const { group, columnTable } = viewTable(props.options);

    function updateTable() {
      emitter.emit("updateTable", true);
    }

    function showModalFilter() {
      emitter.emit("showModalFilter", true);
    }
    function exportExcel() {
      emitter.emit("exportTable", true);
    }

    const showFrom = (event) => {
      const path = router.currentRoute.value.path + "/" + event;
      router.push(path);
    };

    const eliminar = (id) => {
      Dialog.create({
        title: 'Eliminar',
        message: 'Estas seguro de eliminar el registro?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await eliminarVisitante(route.meta.mode, id)
        emitter.emit("updateTableNormal", true);
      })

    }

    return {
      route,
      group,
      columnTable,
      updateTable,
      showModalFilter,
      showFrom,
      exportExcel,
      eliminar
    };
  }
};
</script>
<style lang="sass">
.dashed:before
  border-style: dashed !important
</style>
