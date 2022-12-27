<template>
  <PagePath />
  <q-card class="q-mx-md q-mt-sm bg-grey-2">
    <form @submit.prevent="onSubmit">
      <q-card-section class="bg-white q-gutter-y-sm" rounded>
        <div class="row q-gutter-x-md">
          <div class="col">
            <div class="text-caption text-grey-8">Nombre</div>
            <q-input class="shadow bg-white" outlined v-model="vv.nombre.$model" :dense="true" />
            <small v-if="vv.nombre.$error" class="text-red">Campo requerido</small>
          </div>
          <div class="col">
            <div class="text-caption text-grey-8">Dni</div>
            <q-input class="shadow bg-white" outlined v-model="vv.dni.$model" :dense="true" />
            <small v-if="vv.dni.$error" class="text-red">Campo requerido</small>
          </div>
        </div>
        <div class="row q-gutter-x-md">
          <div class="col">
            <div class="text-caption text-grey-8">Motivo</div>
            <q-input class="shadow bg-white" outlined v-model="vv.motivo.$model" :dense="true" />
            <small v-if="vv.motivo.$error" class="text-red">Campo requerido</small>
          </div>
          <div class="col">
            <div class="text-caption text-grey-8">Lugar</div>
            <q-input class="shadow bg-white" outlined v-model="vv.lugar.$model" :dense="true" />
            <small v-if="vv.lugar.$error" class="text-red">Campo requerido</small>
          </div>
        </div>
        <div class="row q-gutter-x-md">
          <div class="col">
            <div class="text-caption text-grey-8">Area</div>
            <q-select class="shadow bg-white" outlined :dense="true" v-model="vv.area_id.$model" use-input hide-selected
              fill-input input-debounce="0" :options="dataArea.area[0]" option-value="id" option-label="nombre">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No results </q-item-section>
                </q-item>
              </template>
            </q-select>
            <small v-if="vv.area_id.$error" class="text-red">Campo requerido</small>
          </div>
          <div class="col">
            <div class="text-caption text-grey-8">Estado</div>
            <q-select class="shadow bg-white" outlined :dense="true" v-model="vv.tipo_estado_id.$model" use-input
              hide-selected fill-input input-debounce="0" :options="dataArea.estado[0]" option-value="id" option-label="nombre">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No results </q-item-section>
                </q-item>
              </template>
            </q-select>
            <small v-if="vv.tipo_estado_id.$error" class="text-red">Campo requerido</small>
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col flex items-center justify-end">
            <q-btn push color="red-1" class="q-mr-sm" text-color="red" label="Cancelar" @click="volver()" />
            <q-btn push class="bg-3" text-color="white" icon="save" label="Guardar" @click="onSubmit" />
          </div>
        </div>
      </q-card-section>
    </form>
  </q-card>
</template>
<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'

import { useAuthStore } from '../../stores/authStore'
import { getAreas } from '../../services/maestroServices'
import { guardarVisitante } from '../../services/visitasServices'

import PagePath from "../../common/PagePath.vue";

export default {
  name: "create",
  components: {
    PagePath,
  },
  setup() {
    const router = useRouter();
    const options = ref(stringOptions);
    const dataArea = reactive({ area: [], estado:[] })
    const form = reactive({
      nombre: "",
      dni: "",
      motivo: "",
      lugar: "",
      area_id: "",
      tipo_estado_id: { "id": 1, "nombre": "ACTIVO", "switch": "CRUD", "estado": 1, "created_at": null, "updated_at": null }
    })

    const rules = {
      nombre: { required },
      dni: { required },
      motivo: { required },
      lugar: { required },
      area_id: { required },
      tipo_estado_id: { required }
    }



    const getListadoArea = async () => {
      const res = await getAreas()
      dataArea.area.push(res.area)
      dataArea.estado.push(res.estado)
    }

    onMounted(() => {
      getListadoArea()
    })

    const vv = useVuelidate(rules, form);

    const onSubmit = async () => {
      vv.value.$touch();
      if (vv.value.$invalid) return;
      const res = await guardarVisitante(form)
      if (res.success){
        router.go(-1);
      }
    }

    // const filterFn = (val, update, abort) => {
    //   console.log(dataArea.area)
    //   update(() => {
    //     const needle = val.toLowerCase();
    //     console.log("🚀 ~ file: Create.vue:132 ~ update ~ needle", needle)
    //     dataArea.area[0] = dataArea.area[0].filter((v) => v.toLowerCase().indexOf(needle.id) > -1);
    //   });
    // };

    const volver = () => {
      router.go(-1);
    };

    return {
      options,
      volver,
      vv,
      onSubmit,
      dataArea
    };
  },
};
</script>
<style scoped lang="sass">
#tierno:focus-within
    & + .hover-new
            outline: none !important
            border: 0.2px solid red !important
            border-radius: 5px !important

</style>
