<template>
  <q-layout view="hHh lpR fFf" class="bg-2">
    <q-page class="flex flex-center">
      <div class="q-pa-md shadow-5 rounded-borders bg-white" style="width: 320px">
        <q-form @submit="onSubmit">
          <div class="row" style="margin-top: -50px">
            <div class="col">
              <q-card class="my-card shadow-10">
                <q-card-section class="flex justify-between rounded-borders bg-3" style="padding: 6px 15px">
                  <span style="font-size: 23px" class="text-white"> C.VISITAS </span>
                  <div class="my-card color-minpas-1 rounded-borders"
                    style="background: white; padding: 1px 20px; height: max-content; margin-top: 8px; font-size: 11px;">
                    Admin Panel
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div class="row q-py-lg">
            <div class="col text-center">
              <q-icon name="fingerprint" class="color-3" style="font-size: 45px" />
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col">
              <q-input color="text-color5" outlined dense v-model="form.usuario" prefix="Usuario:" :disable="loader"
                @keydown.enter.prevent="onSubmit()">
                <template v-slot:prepend>
                  <q-icon name="verified_user" class="color-sa" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-my-md">
            <div class="col">
              <q-input outlined dense v-model="form.password" :type="isPwd ? 'password' : 'text'" prefix="Password:"
                :disable="loader" @keydown.enter.prevent="onSubmit()">
                <template v-slot:prepend>
                  <q-icon name="lock" class="color-sa" />
                </template>
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer color-sa"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
              <!-- <small v-if="store.errorAuth.length > 0" class="text-red text-center">
                                {{ store.errorAuth[0] }}
                            </small> -->
            </div>
          </div>
          <div class="row q-pb-lg">
            <div class="col text-center">
              <q-btn class="bg-3 text-white" :loading="loader" @click="onSubmit()" icon-right="login" label="Ingresar">
                <template v-slot:loading>
                  Cargando
                  <q-spinner-hourglass class="on-left q-ml-sm" />
                </template>
              </q-btn>
            </div>
          </div>

          <div class="row">
            <div class="col text-center">
              <q-item-label caption class="color-3">https://www.aeroprop.pe <br />
                Todos los derechos reservados @2022</q-item-label>
            </div>
          </div>
        </q-form>
      </div>
    </q-page>
  </q-layout>
</template>
<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

import { login } from '../services/authServices'

export default {
  name: "DefaultLayout",
  setup() {
    const router = useRouter();
    const loader = ref(false)
    const isPwd = ref(true);

    const form = reactive({
      usuario: "",
      password: "",
    });
    const rules = {
      usuario: { required, minLength: minLength(3), maxLength: maxLength(15) },
      password: { required, minLength: minLength(6), maxLength: maxLength(20) },
    };

    const vv = useVuelidate(rules, form);

    const onSubmit = async () => {
      vv.value.$touch();
      if (vv.value.$invalid) return;
      loader.value = true
      const res = await login(form)
      if (res.success) {
        const idAdmin = res.data.user.tipo_role.id
        idAdmin == 1 || idAdmin == 2 ? router.push('/panel-admin') : router.push('/panel-usuario')
      }
      loader.value = false
    }

    return {
      loader,
      form,
      vv,
      onSubmit,
      isPwd,
      path: process.env.API_URL
    };
  },
};
</script>
<style lang="sass" scoped>
.error
  border: 2px solid red
  border-radius: 4px
.my-sticky-column-table
  max-width: 600px
  thead tr:first-child th:first-child
    background-color: #fff
  td:first-child
    background-color: #f5f5dc
  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>


