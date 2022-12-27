<template>
  <q-markup-table separator="cell" bordered>
    <thead class="text-white roundeds bg-5">
      <tr class="text-center text-bold">
        <th v-for="(x, index) in totalColumnas" :key="index">
          <div class="flex items-center justify-center">
            <label class="q-pr-sm text-uppercase">{{ x["label"] }}</label>
            <q-icon v-if="query.order_direction === 'asc'" name="mdi-order-alphabetical-ascending"
              class="cursor-pointer iconFlecha" @click="updateOrderColumn(x['column'])" />
            <q-icon v-else name="mdi-order-alphabetical-descending" class="cursor-pointer iconFlecha"
              @click="updateOrderColumn(x['column'])" />
          </div>
        </th>
      </tr>
    </thead>
    <tbody v-if="loading" class="bg-white">
      <template class="text-center" v-for="item in collection['data']" :item="item">
        <slot :item="item"></slot>
      </template>
    </tbody>
    <SkeletonTable v-else :TR="5" :TD="totalColumnas.length" />
    <tfoot>
      <tr>
        <td colspan="100" style="border-top: 1px solid #e0e0e0">
          <div class="row items-center justify-end">
            <small v-if="loading === 'nodata'" class="text-red">👉 😭 No se encontro datos</small>
            <div class="q-table__separator col"></div>
            <div class="q-table__control q-mr-sm maxi">
              <span class="q-table__bottom-item text-caption">Filas por página:</span>
              <q-select outlined v-model="query.limit" :options="options" @update:model-value="updateLimit()"
                :dense="true" :options-dense="true" />
            </div>
            <div class="q-table__control">

              <span class="q-table__bottom-item text-caption">
                Demostración {{ collection['from'] }} - {{ collection['to'] }} de
                {{ collection['total'] }} entradas
              </span>

              <button
                class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--round text-grey-8 q-btn--actionable q-focusable q-hoverable q-btn--dense"
                tabindex="-1" type="button" role="button" style="font-size: 10px"
                :disabled="collection['prev_page_url'] ? false : true" @click="prevPage()">
                <span class="q-focus-helper"></span>
                <span class="q-btn__content text-center col items-center q-anchor--skip justify-center row">
                  <svg class="q-icon" aria-hidden="true" role="img" viewBox="0 0 24 24">
                    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                  </svg>
                </span>
              </button>
              <button
                class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--round text-grey-8 q-btn--actionable q-focusable q-hoverable q-btn--dense"
                tabindex="0" type="button" role="button" style="font-size: 10px"
                :disabled="collection['next_page_url'] ? false : true" @click="nextPage()">
                <span class="q-focus-helper"></span><span
                  class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><svg
                    class="q-icon" aria-hidden="true" role="img" viewBox="0 0 24 24">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                  </svg></span>
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  </q-markup-table>
  <!-- Modal filter -->
  <q-dialog v-model="fixed" position="top" persistent>
    <q-card style="width: 900px; max-width: 80vw">
      <q-card-section class="flex items-center q-py-xs text-blue-10">
        <q-icon name="mdi-air-filter" size="xs" class="q-mr-xs" />
        <div class="text-h6">FILTRAR</div>
      </q-card-section>
      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <div class="row q-mb-sm" v-for="(f, i) in filterCandidates" :key="f.id">
          <div class="col-3">
            <q-select v-model="f.id" filled :options="filterGroups[0]['filters']" option-label="title"
              label="Filtrar columna" color="teal" :dense="true" :options-dense="true">
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" @click="selectColumn(i, scope.opt)">
                  <q-item-section>
                    <q-item-label v-html="scope.opt.title" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-3 q-px-sm" v-if="f.column">

            <q-select v-model="f.operator" filled :options="fetchOperators(f)" label="Selecionar" option-label="title"
              color="teal" :dense="true" :options-dense="true">
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" @click="selectOperator(i, scope.opt)">
                  <q-item-section>
                    <q-item-label v-html="scope.opt.title" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-5 flex" v-if="f.column && f.operator">



            <template v-if="f.operator.component === 'single'">

              <q-input v-if="f.column.name == 'hora_ing'" class="full-width"
                :class="[{ errors: errors[`f.${i}.query_1`] }]" v-model="f.query_1" type="date" :dense="true"
                :options-dense="true" outlined />

              <q-input v-else-if="f.column.name == 'hora_sal'" class="full-width"
                :class="[{ errors: errors[`f.${i}.query_2`] }]" v-model="f.query_2" type="date" :dense="true"
                :options-dense="true" outlined />

              <!-- DEFAULT -->
              <q-input v-else class="full-width" :class="[{ errors: errors[`f.${i}.query_1`] }]" outlined
                v-model="f.query_1" label="Buscar palabra" :dense="true" :options-dense="true" />
              <small class="text-red" v-if="errors[`f.${i}.query_1`]">Campo requerido</small>
            </template>
            <template v-if="f.operator.component === 'double'" class="row">
              <template v-if="f.column.name === 'hora_ing' || f.column.name === 'hora_sal'">
                <div class="col q-mr-xs">
                  <q-input v-model="f.query_1" :class="[{ errors: errors[`f.${i}.query_1`] }]" type="date" :dense="true"
                    :options-dense="true" outlined />
                  <small class="text-red" v-if="errors[`f.${i}.query_1`]">Campo requerido</small>
                </div>
                <div class="col">
                  <q-input v-model="f.query_2" :class="[{ errors: errors[`f.${i}.query_2`] }]" type="date" :dense="true"
                    :options-dense="true" outlined />
                  <small class="text-red" v-if="errors[`f.${i}.query_2`]">Campo requerido</small>
                </div>
              </template>
              <template v-else>
                <div class="col q-pr-sm">
                  <q-input class="full-width" :class="[{ errors: errors[`f.${i}.query_1`] }]" outlined
                    v-model="f.query_1" label="Buscar palabra" :dense="true" :options-dense="true" />
                  <small class="text-red" v-if="errors[`f.${i}.query_1`]">Campo requerido</small>
                </div>
                <div class="col">
                  <q-input class="full-width" :class="[{ errors: errors[`f.${i}.query_2`] }]" outlined
                    v-model="f.query_2" label="Buscar palabra" :dense="true" :options-dense="true" />
                  <small class="text-red" v-if="errors[`f.${i}.query_2`]">Campo requerido</small>
                </div>
              </template>
            </template>

            <template v-if="f.operator.component === 'static_lookup'">
              <q-select outlined v-model="f.query_1" :options="optionsStatusEstado" label="Estados" :dense="true"
                :options-dense="true" class="full-width" emit-value map-options />
              <!-- <q-input
                class="full-width"
                :class="[{ errors: errors[`f.${i}.query_1`] }]"
                v-model="f.query_1"
                :dense="true"
                :options-dense="true"
                outlined
              /> -->
              <small class="text-red" v-if="errors[`f.${i}.query_1`]">Campo requerido</small>
            </template>


            <template v-if="f.operator.component === 'datetime_1'">
              <div class="col q-pr-md">
                <q-input class="full-width" v-model="f.query_1" type="number" :dense="true" filled />
              </div>
              <div class="col">
                <select class="full-width bg-grey-3 no-border cursor-pointer select-css" v-model="f.query_2">
                  <option value="hours">Horas</option>
                  <option value="days">Dias</option>
                  <option value="months">Meses</option>
                  <option value="years">Años</option>
                </select>
              </div>
            </template>
            <template v-if="f.operator.component === 'datetime_2'">
              <select class="full-width bg-grey-3 no-border cursor-pointer select-css" v-model="f.query_1">
                <option style="padding: 10px 10px" value="yesterday">ayer</option>
                <option value="today">hoy</option>
                <option value="tomorrow">mañana</option>
                <option value="last_month">el mes pasado</option>
                <option value="this_month">este mes</option>
                <option value="next_month">siguiente mes</option>
                <option value="last_year">última año</option>
                <option value="this_year">este año</option>
                <option value="next_year">siguiente año</option>
              </select>
            </template>
          </div>
          <div class="col-1 flex justify-center items-center" v-if="f && f.column">
            <q-icon @click="removeFilter(f, i)" class="cursor-pointer" size="xs" name="mdi-trash-can-outline"
              color="red" />
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn @click="addFilter" outline color="primary" size="sm" icon="mdi-filter-plus-outline" label="Agregar" />
        <q-btn @click="applyFilter" push color="green" size="sm" icon="mdi-filter-menu-outline" label="Aplicar" />
        <q-btn @click="resetFilter" v-if="appliedFilters.length > 0" push color="blue" size="sm"
          icon="mdi-filter-remove-outline" label="Resetear" />
        <q-btn push color="red" size="sm" icon-right="mdi-logout-variant" label="Salir" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>
<script>
import { toRefs } from 'vue'
import SkeletonTable from '../../../common/SkeletorTable.vue';
import filterable from '../../../composables/configFilterable'
export default {
  props: {
    url: String,
    filterGroups: Array,
    orderables: Array,
  },
  components: { SkeletonTable },
  setup(props) {
    const {
      globalVal,
      query,
      fetchOperators,
      updateLimit,
      nextPage,
      prevPage,
      updateOrderColumn,
      selectColumn,
      selectOperator,
      applyFilter,
      resetFilter,
      addFilter,
      removeFilter,
      totalColumnas
    } = filterable(props.url, props.orderables)

    return {
      ...toRefs(globalVal),
      query,
      fetchOperators,
      updateLimit,
      nextPage,
      prevPage,
      updateOrderColumn,
      selectColumn,
      selectOperator,
      applyFilter,
      resetFilter,
      addFilter,
      removeFilter,
      totalColumnas
    }
  }
}
</script>
