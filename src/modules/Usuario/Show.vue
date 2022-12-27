<template>
  <PagePath />
  <q-card class="q-mx-md q-mt-sm bg-grey-2">
    <form @submit.prevent="onSubmit">
      <q-card-section class="bg-white q-gutter-y-sm" rounded>
        <div class="row q-gutter-x-md">
          <div class="col">
            <div class="text-caption text-grey-8">Nombre</div>
            <q-input class="shadow bg-white" outlined v-model="vv.nombre.$model" :dense="true" disable />
            <small v-if="vv.nombre.$error" class="text-red">Campo requerido</small>
          </div>
          <div class="col">
            <div class="text-caption text-grey-8">Usuario</div>
            <q-input class="shadow bg-white" outlined v-model="vv.usuario.$model" :dense="true" disable />
            <small v-if="vv.usuario.$error" class="text-red">Campo requerido</small>
          </div>
          <div class="col">
            <div class="text-caption text-grey-8">Contraseña</div>
            <q-input class="shadow bg-white" outlined v-model="vv.password.$model" :dense="true" disable />
            <small v-if="vv.password.$error" class="text-red">Campo requerido</small>
          </div>
        </div>

        <div class="row q-gutter-x-md">
          <div class="col">
            <div class="text-caption text-grey-8">Sede</div>
            <q-select class="shadow bg-white" outlined :dense="true" v-model="vv.sede_id.$model" use-input hide-selected
              fill-input input-debounce="0" :options="dataArea.sede[0]" option-value="id" option-label="nombre" disable>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No results </q-item-section>
                </q-item>
              </template>
            </q-select>
            <small v-if="vv.sede_id.$error" class="text-red">Campo requerido</small>
          </div>
          <div class="col">
            <div class="text-caption text-grey-8">Rol</div>
            <q-select class="shadow bg-white" outlined :dense="true" v-model="vv.tipo_role_id.$model" use-input
              hide-selected fill-input input-debounce="0" :options="dataArea.rol[0]" option-value="id"
              option-label="nombre" disable>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No results </q-item-section>
                </q-item>
              </template>
            </q-select>
            <small v-if="vv.tipo_role_id.$error" class="text-red">Campo requerido</small>
          </div>
          <div class="col">
            <div class="text-caption text-grey-8">Estado</div>
            <q-select class="shadow bg-white" outlined :dense="true" v-model="vv.tipo_estado_id.$model" use-input
              hide-selected fill-input input-debounce="0" :options="dataArea.estado[0]" option-value="id"
              option-label="nombre" disable>
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
            <q-btn push color="red-1" class="q-mr-sm" text-color="red" label="Salir" @click="volver()" />
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

import { getSede } from '../../services/maestroServices'
import { actualizarUser, getDataUser } from '../../services/usuarioServices'

import PagePath from "../../common/PagePath.vue";

export default {
  name: "create",
  components: {
    PagePath,
  },
  setup() {
    const router = useRouter();
    const options = ref(stringOptions);
    const dataArea = reactive({ sede: [], estado: [], rol: [] })
    const form = reactive({
      nombre: "",
      usuario: "",
      password: "",
      sede_id: "",
      tipo_role_id: "",
      tipo_estado_id: ""
    })

    const rules = {
      nombre: { required },
      usuario: { required },
      password: {},
      sede_id: { required },
      tipo_role_id: { required },
      tipo_estado_id: { required }
    }

    const getData = async () => {
      const resDataValue = await getDataUser(router.currentRoute.value.params.id)
      form.nombre = resDataValue.data.nombre
      form.usuario = resDataValue.data.usuario
      form.password = resDataValue.data.password
      form.sede_id = { nombre: resDataValue.data.user_sede.sede.nombre, id: resDataValue.data.user_sede.id }
      form.tipo_role_id = { nombre: resDataValue.data.tipo_role.nombre, id: resDataValue.data.tipo_role.id }
      form.tipo_estado_id = { nombre: resDataValue.data.tipo_estado.nombre, id: resDataValue.data.tipo_estado.id }
    }


    getData()

    const getListadoArea = async () => {
      const res = await getSede()
      dataArea.sede.push(res.sede)
      dataArea.estado.push(res.estado)
      dataArea.rol.push(res.rol)
    }

    onMounted(() => {
      getListadoArea()
    })

    const vv = useVuelidate(rules, form);


    const volver = () => {
      router.go(-1);
    };

    return {
      options,
      volver,
      vv,
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
